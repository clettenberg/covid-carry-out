require 'open-uri'
require 'uri'

class FetchStlTodayRestaurants
  SCHEMES = %w(http https)

  def self.call(fresh: false)
    new.fetch!(fresh)
  end

  def fetch!(fresh)
    if fresh
      Restaurant.delete_all
      County.delete_all
      Cuisine.delete_all
    end

    url = "https://graphics.stltoday.com/apps/corona-restaurants/index.html"
    doc = Nokogiri::HTML(URI.open(url), nil, 'utf-8')

    doc.css(".county").each do |cty|
      county_name = cty.at_css("h2").inner_text.strip.downcase
      county = County.find_or_create_by(name: county_name)

      cty.css(".cuisine").each do |cui|
        cuisine_name = cui.at_css("h3").inner_text.strip.downcase
        cuisine = Cuisine.find_or_create_by(name: cuisine_name)

        telephone = nil
        website = nil
        address = nil

        cui.css(".restaurant").each do |rst|
          name = rst.at_css("h4").inner_text.strip.downcase
          more_info = rst.at_css("address")
            .inner_text.split("•")
            .map(&:strip)
            .map(&:downcase)

          if more_info.count == 3
            address, website, telephone = more_info
          else
            more_info.each do |info|
              if TelephoneNumber.parse(info, :us).valid?
                telephone = info
              elsif valid_url?(info)
                website = info
              else
                address = info
              end
            end
          end

          begin
            Restaurant.create!(
              name: name,
              address: address,
              website: website,
              telephone: telephone,
              county: county,
              cuisine: cuisine
            )
          rescue ActiveRecord::RecordNotUnique
            Rails.logger.warn(
              """
              Duplicate record:
                Name: #{name}
                Address: #{address}
              """
            )
          end
        end
      end
    end
  end

  private

  def valid_url?(url)
    URI.parse(url)
    true
  rescue URI::InvalidURIError
    false
  end
end

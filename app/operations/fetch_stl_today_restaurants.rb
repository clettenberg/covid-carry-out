require "open-uri"

class FetchStlTodayRestaurants
  EVENT_TYPE = "update_restaurants"

  def self.call(fresh: false)
    new.fetch!(fresh)
  end

  def fetch!(fresh)
    url = "https://graphics.stltoday.com/apps/corona-restaurants/index.html"
    doc = Nokogiri::HTML(URI.open(url), nil, "utf-8")


    [Restaurant, County, Cuisine].each do |record|
      puts "===== Deleting #{record} ====="
      record.delete_all
    end

    puts "===== Create Restaurants ====="
    restaurants_to_save = []
    doc.css(".county").each do |cty|
      county_name = cty.at_css("h2").inner_text.strip.downcase
      county_id = County.find_or_create_by(name: county_name).id

      cty.css(".cuisine").each do |cui|
        cuisine_name = cui.at_css("h3").inner_text.strip.downcase
        cuisine_id = Cuisine.find_or_create_by(name: cuisine_name).id
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

          most_info = rst.css("li").each_with_object({}) { |li, obj|
            key, value = li.inner_text.split(":", 2).map(&:strip).map(&:downcase)
            obj[key.tr(" ", "_").to_sym] = value
          }

          restaurants_to_save << {
            name: name,
            address: address,
            website: website,
            telephone: telephone,
            county_id: county_id,
            cuisine_id: cuisine_id,
            menu: nil,
            service: nil,
            hours: nil,
            special_deals: nil
          }.merge(most_info)
        end
      end
    end

    Restaurant.insert_all(restaurants_to_save)

    Event.create!(event_type: EVENT_TYPE)
  end

  private

  def valid_url?(url)
    URI.parse(url)
    true
  rescue URI::InvalidURIError
    false
  end
end

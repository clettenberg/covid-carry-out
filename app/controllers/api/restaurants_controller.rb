class Api::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.all
    presenter = PluckMap[Restaurant].define do
      id
      name map: ->(name) { name.titleize }
      website map: ->(website) do
        begin
          return "http://#{website}" if URI.parse(website).relative?
          website
        rescue URI::InvalidURIError => exception
          website
        end
      end
      address map: ->(address) { address.titleize }
      hours
      telephone
      service map: ->(service) { service.capitalize }
      special_deals as: "specialDeals"

      has_one :county do
        id
        name map: ->(name) { name.titleize }
      end

      has_one :cuisine do
        id
        name map: ->(name) { name.titleize }
      end
    end

    render json: presenter.to_h(restaurants)
  end
end

class Api::RestaurantsController < ApplicationController
  def index
    restaurants = Restaurant.all
    presenter = PluckMap[Restaurant].define do
      id
      name select: %i[ name ], map: ->(name) { name.titleize }
      website

      has_one :county do
        id
        name select: %i[ name ], map: ->(name) { name.titleize }
      end

      has_one :cuisine do
        id
        name select: %i[ name ], map: ->(name) { name.titleize }
      end
    end

    render json: presenter.to_h(restaurants)
  end
end

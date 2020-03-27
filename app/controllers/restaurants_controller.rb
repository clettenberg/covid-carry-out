class RestaurantsController < ApplicationController
  def index
    binding.pry
    @restaurants = Restaurant.all
  end
end

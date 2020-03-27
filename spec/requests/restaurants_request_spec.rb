require "rails_helper"

RSpec.describe "Restaurants" do
  xdescribe "GET /restaurants" do
    it "returns http success" do
      get "/restaurants"
      expect(response).to have_http_status(:success)
    end
  end
end

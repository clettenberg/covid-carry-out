require 'rails_helper'

RSpec.describe FetchStlTodayRestaurants, :vcr do
  let(:subject) { FetchStlTodayRestaurants.call }

  context "on the first run" do
    before do
      Restaurant.delete_all
      County.delete_all
      Cuisine.delete_all
    end

    it "saves records to database" do
      subject

      expect(Restaurant.count).to eq(310)
      expect(County.count).to eq(6)
      expect(Cuisine.count).to eq(71)
    end
  end

  context "on subsequent runs" do
    context "when fresh is false" do
      it "does not create new ones if they have not changed" do
        expect{subject}.to_not change{ Restaurant.count }
        expect{subject}.to_not change{ County.count }
        expect{subject}.to_not change{ Cuisine.count }
      end
    end
  end


end

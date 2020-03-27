namespace :restaurants do
  desc "fetch restaurants"
  task fetch: :environment do
    FetchStlTodayRestaurants.call
  end

  desc "fetch fresh restaurants"
  task fetch_fresh: :environment do
    FetchStlTodayRestaurants.call(fresh: true)
  end

end

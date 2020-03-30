desc "fetch fresh restaurants"
task "update_restaurants": :environment do
  puts "Updating restaurants..."
  FetchStlTodayRestaurants.call(fresh: true)
  puts "done."
end

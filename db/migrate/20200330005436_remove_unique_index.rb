class RemoveUniqueIndex < ActiveRecord::Migration[6.0]
  def change
    remove_index :restaurants, name: :index_restaurants_on_county_id_and_cuisine_id_and_address
  end
end

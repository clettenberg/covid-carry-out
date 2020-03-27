class AddMoreInfoColumnsToRestaurant < ActiveRecord::Migration[6.0]
  def change
    add_column :restaurants, :menu, :string
    add_column :restaurants, :service, :string
    add_column :restaurants, :special_deals, :text
  end
end

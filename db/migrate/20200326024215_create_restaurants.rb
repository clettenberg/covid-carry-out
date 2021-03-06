class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :website
      t.string :hours
      t.string :telephone
      t.references :county, null: false, foreign_key: true
      t.references :cuisine, null: false, foreign_key: true

      t.timestamps
    end

    add_index :restaurants, [:county_id, :cuisine_id, :address], unique: true
  end
end

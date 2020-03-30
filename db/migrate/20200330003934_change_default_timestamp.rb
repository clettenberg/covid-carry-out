class ChangeDefaultTimestamp < ActiveRecord::Migration[6.0]
  def change
    change_column_default :restaurants, :created_at, from: nil, to: -> { "NOW()" }
    change_column_default :restaurants, :updated_at, from: nil, to: -> { "NOW()" }
    change_column_default :counties, :created_at, from: nil, to: -> { "NOW()" }
    change_column_default :counties, :updated_at, from: nil, to: -> { "NOW()" }
    change_column_default :cuisines, :created_at, from: nil, to: -> { "NOW()" }
    change_column_default :cuisines, :updated_at, from: nil, to: -> { "NOW()" }
    change_column_default :events, :created_at, from: nil, to: -> { "NOW()" }
    change_column_default :events, :updated_at, from: nil, to: -> { "NOW()" }
  end
end

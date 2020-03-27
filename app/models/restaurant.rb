class Restaurant < ApplicationRecord
  belongs_to :county
  belongs_to :cuisine
end

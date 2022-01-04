class Match < ApplicationRecord
  has_many :scores, dependent: :destroy
end

class Match < ApplicationRecord
  has_many :scores, dependent: :destroy
  has_one :booking
end

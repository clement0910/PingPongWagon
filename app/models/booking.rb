class Booking < ApplicationRecord
  belongs_to :user
  has_one :match

  validates :start, uniqueness: true
  validates :end, uniqueness: true
end

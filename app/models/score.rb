class Score < ApplicationRecord
  belongs_to :user
  belongs_to :match

  validates :score, numericality: { only_integer: true, less_than_or_equal_to: 21 }
end

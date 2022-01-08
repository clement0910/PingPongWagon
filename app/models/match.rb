class Match < ApplicationRecord
  belongs_to :winner, class_name: 'User'
  belongs_to :loser, class_name: 'User'

  validates :winner_score, numericality: { only_integer: true, less_than_or_equal_to: 21 }
  validates :loser_score, numericality: { only_integer: true, less_than_or_equal_to: 21 }
end

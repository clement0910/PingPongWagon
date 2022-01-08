class Match < ApplicationRecord
  belongs_to :winner, class_name: 'User'
  belongs_to :loser, class_name: 'User'

  validates :winner_score, numericality: { only_integer: true, less_than_or_equal_to: 21 }
  validates :loser_score, numericality: { only_integer: true, less_than_or_equal_to: 21 }
  validate :check_score, on: create

  private

  def check_score
    if loser_score > winner_score
      errors.add(winner_score, "An Error has occured.")
    end
  end
end

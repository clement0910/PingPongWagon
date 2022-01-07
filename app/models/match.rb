class Match < ApplicationRecord
  has_many :scores, dependent: :destroy
  belongs_to :booking, optional: true
end

class Booking < ApplicationRecord
  belongs_to :user

  validates :start, uniqueness: true
  validates :end, uniqueness: true
  validate :valid_date
  validate :check_existed_date, on: :create

  private

  def valid_date
    # ap start.in_time_zone("Europe/Paris") - 1.hour
    # ap DateTime.now
    errors.add(:start, "Invalid date") if start > self.end || start.in_time_zone("Europe/Paris") - 1.hour < DateTime.now
    # need recheck comparison with start and Datetime.now
    # start.to_datetime < DateTime.now.new_offset("0") + 1.hour
  end

  def check_existed_date
    @bookings = Booking.where('start >= ?', Date.today)
    @bookings.each do |booking|
      errors.add(:start, "Invalid date") if self.start > booking.start && self.start < booking.end
      errors.add(:start, "Invalid date") if self.start < booking.start && self.end > booking.end
    end
  end
end

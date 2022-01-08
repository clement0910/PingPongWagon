class BookingsController < ApplicationController
  before_action :set_booking, only: [:update, :destroy]
  def index
    @bookings = Booking.where('start >= ?', Date.today)
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.user = current_user
    @booking.title = "#{current_user.name}'s Slot"
    if @booking.save
      redirect_to root_path
    else
      redirect_to root_path, alert: 'An Error has occured.'
    end
  end

  def update
    redirect_to root_path, alert: 'An Error has occured.' unless @booking.update(booking_params) || @booking.user != current_user
  end

  def destroy
    if @booking.user == current_user && @booking.destroy
      redirect_to root_path
    else
      redirect_to root_path, alert: 'An Error has occured.'
    end
  end

  private

  def set_booking
    @booking = Booking.find(params[:id])
  end

  def booking_params
    params.require(:booking).permit(:start, :end)
  end
end

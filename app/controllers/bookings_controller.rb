class BookingsController < ApplicationController
  before_action :set_booking, only: [:update, :destroy]
  def index
    @bookings = Booking.all
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.match = Match.create
    @booking.user = current_user
    @booking.title = 'PLACEHOLDER'
    if @booking.save
      redirect_to root_path
    else
      render :new
    end
  end

  def update
    @booking.update(booking_params)
  end

  def destroy
    @booking.destroy
    redirect_to root_path
  end

  private

  def set_booking
    @booking = Booking.find(params[:id])
  end

  def booking_params
    params.require(:booking).permit(:start, :end)
  end
end

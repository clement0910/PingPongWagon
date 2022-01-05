class BookingsController < ApplicationController
  def create
    ap "LOL"
    @booking = Booking.create!(start: params[:start],
                               end: params[:end],
                               user: current_user,
                               match: Match.create
                              )
  end

end

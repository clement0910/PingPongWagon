class PagesController < ApplicationController
  def home
    @users = User.all_except(current_user)
  end

  def ranking
    @matches
  end

  def accepted_match
    @user = current_user
    @bookings = Booking.where(user: current_user)
    @matches = (@user.winner + @user.loser).reject { |match| match.accepted == true }
  end

end

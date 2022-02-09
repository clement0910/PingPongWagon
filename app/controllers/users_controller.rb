class UsersController < ApplicationController
  before_action :set_user, only: [:profile, :no_disturb]

  def profile
    @bookings = Booking.where(user: current_user)
    @matches = (@user.winner + @user.loser).reject { |match| match.accepted == false }
  end

  def current_user_id
    render json: {id: current_user.id}
  end

  def no_disturb
    @user.toggle(:no_disturb).save
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end
end

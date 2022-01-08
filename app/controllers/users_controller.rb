class UsersController < ApplicationController
  before_action :set_user, only: [:profile]

  def profile
    @matches = (@user.winner + @user.loser).reject { |match| match.accepted == false }
  end

  def current_user_id
    render json: {id: current_user.id}
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end
end

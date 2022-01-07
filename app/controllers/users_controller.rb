class UsersController < ApplicationController
  before_action :set_user, only: [:profile]

  def profile
    @matches = @user.matches.where(is_accepted: true)
  end

  def current_user
    render json: {id: current_user.id}
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end
end

class UsersController < ApplicationController
  before_action :set_user, only: [:profile]

  def profile
    @matches = @user.matches
  end

  private

  def set_user
    @user = User.find(current_user.id)
  end
end

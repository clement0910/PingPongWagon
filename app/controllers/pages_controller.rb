class PagesController < ApplicationController
  def home
    @users = User.all_except(current_user)
  end

  def ranking

  end
end

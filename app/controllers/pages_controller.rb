class PagesController < ApplicationController
  def home
    @match = true
    @users = User.all
  end

  def ranking

  end
end

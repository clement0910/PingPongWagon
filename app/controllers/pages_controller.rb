class PagesController < ApplicationController
  def home
    @match = true
    @db_events = current_user.bookings.map do |event|
      {
        id: event.id,
        start: event.start.strftime('%FT%T%:z'),
        end: event.end.strftime('%FT%T%:z')
      }
      @users = User.all
    end
  end

  def ranking

  end
end

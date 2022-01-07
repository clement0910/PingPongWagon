date_format = "%Y-%m-%d %H:%M%z"
json.extract! booking, :id, :title
json.url booking_url(booking, format: :json)
json.start booking.start.strftime(date_format)
json.end booking.end.strftime(date_format)
json.user booking.user_id

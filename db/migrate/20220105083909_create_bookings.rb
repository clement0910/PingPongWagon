class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.datetime :start
      t.datetime :end
      t.references :user, null: false, foreign_key: true
      t.references :match, null: true, foreign_key: true

      t.timestamps
    end
  end
end

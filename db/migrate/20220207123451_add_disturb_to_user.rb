class AddDisturbToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :no_disturb, :boolean
  end
end

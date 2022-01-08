class AddIsAcceptedToMatches < ActiveRecord::Migration[6.0]
  def change
    add_column :matches, :is_accepted, :boolean, default: false
  end
end

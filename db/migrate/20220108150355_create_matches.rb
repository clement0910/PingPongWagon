class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.references :winner, null: false
      t.references :loser, null: false
      t.integer :winner_score
      t.integer :loser_score
      t.boolean :accepted, default: false

      t.timestamps
    end
    add_foreign_key :matches, :users, column: :winner_id, primary_key: :id
    add_foreign_key :matches, :users, column: :loser_id, primary_key: :id
  end
end

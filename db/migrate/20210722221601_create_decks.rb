class CreateDecks < ActiveRecord::Migration[6.1]
  def change
    create_table :decks do |t|
      t.belongs_to :subject, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.boolean :starred

      t.timestamps
    end
  end
end

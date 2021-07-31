class CreateFlashcards < ActiveRecord::Migration[6.1]
  def change
    create_table :flashcards do |t|
      t.belongs_to :deck, null: false, foreign_key: true
      t.text :front
      t.text :back
      t.boolean :starred

      t.timestamps
    end
  end
end

class CreateClocks < ActiveRecord::Migration[6.1]
  def change
    create_table :clocks do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.boolean :show
      t.string :format
      t.boolean :ticking
      t.string :timezone

      t.timestamps
    end
  end
end

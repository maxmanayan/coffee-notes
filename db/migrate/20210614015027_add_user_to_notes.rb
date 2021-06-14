class AddUserToNotes < ActiveRecord::Migration[6.1]
  def change
    add_reference :notes, :user, null: false
    add_foreign_key :notes, :users
  end
end

class Note < ApplicationRecord
  belongs_to :user

  has_many :items, dependent: :destroy
  
  def self.get_todo_notes(id)
    select("*")
    .from("notes")
    .where("user_id = ?", id)
    .where("completed = false")
  end

  def self.get_completed_notes(id)
    select("*")
    .from("notes")
    .where("user_id = ?", id)
    .where("completed = true")
  end
end

class Note < ApplicationRecord
  # belongs_to :user

  has_many :items, dependent: :destroy
  
  def self.get_todo_notes
    select("*")
    .from("notes")
    .where("completed = false")
  end

  def self.get_completed_notes
    select("*")
    .from("notes")
    .where("completed = true")
  end
end

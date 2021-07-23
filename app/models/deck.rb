class Deck < ApplicationRecord
  belongs_to :subject

  has_many :flashcards, dependent: :destroy
end

class Deck < ApplicationRecord
  belongs_to :subject

  has_many :subjects, dependent: :destroy
end

class Subject < ApplicationRecord
  belongs_to :user

  has_many :decks, dependent: :destroy
end

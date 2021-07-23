class Api::FlashcardsController < ApplicationController
  before_action :get_deck, only: [:index, :show, :create, :update, :destroy]


  def index
    render json: @deck.flashcards.all
  end

  def show
    render json: @deck.flashcards.find(params[:id])
  end

  def create
    new_flashcard = @deck.flashcards.new(flashcard_params)

    if (new_flashcard.save)
      render json: new_flashcard
    else
      render json: {errors: new_flashcard.errors}
    end
  end

  def update
    flashcard = @deck.flashcards.find(params[:id])

    if (flashcard.update(flashcard_params))
      render json: flashcard
    else
      render json: {errors: flashcard.errors}
    end
  end

  def delete
    render json: @deck.flashcard.find(params[:id]).destroy
  end


  private

  def get_deck
    @deck = Deck.find(params[:deck_id])
  end

  def flashcard_params
    params.require(:flashcard).permit(:front, :back, :starred)
  end
end

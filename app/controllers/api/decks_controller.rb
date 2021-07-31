class Api::DecksController < ApplicationController
  before_action :get_subject, only: [:index, :show, :create, :update, :destroy]
  
  def index
    render json: @subject.decks.all
  end

  def show
    render json: @subject.decks.find(params[:id])
  end

  def create 
    new_deck = @subject.decks.new(deck_params)

    if (new_deck.save)
      render json: new_deck
    else
      render json: {errors: new_deck.errors}
    end
  end

  def update 
    deck = @subject.decks.find(params[:id])

    if (deck.update(deck_params))
      render json: deck 
    else
      render json: {errors: deck.errors}
    end
  end

  def destroy 
    render json: @subject.decks.find(params[:id]).destroy
  end


  private

  def get_subject 
    @subject = Subject.find(params[:subject_id])
  end

  def deck_params
    params.require(:deck).permit(:name, :description, :starred)
  end
end

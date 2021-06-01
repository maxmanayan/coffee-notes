class Api::ItemsController < ApplicationController
  before_action :get_note, only: [:index, :show, :create, :update, :destroy]

  def index 
    render json: @note.items.all
  end

  def show
    render json: @note.items.find(params[:id])
  end

  def create
    new_item = @note.items.new(item_params)

    if (new_item.save)
      render json: new_item
    else
      render json: {errors: new_item.errors}
    end
  end

  def update
    @item = @note.items.find(params[:id])

    if @item.update(item_params)
      render json: @item
    else
      render json: {errors: new_item.errors}
    end
  end

  def destroy
    @item = @note.items.find(params[:id])
    render json: @item.destroy
  end

  private

  def get_note
    @note = Note.find(params[:note_id])
  end

  def item_params
    params.require(:item).permit(:content, :completed)
  end
end

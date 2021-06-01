class Api::ItemsController < ApplicationController
  before_action :get_item, only: [:show, :update, :destroy]

  def index 
    render json: Item.all
  end

  def show
    render json: @item
  end

  def create
    new_item = Item.new(item_params)

    if (new_item.save)
      render json: new_item
    else
      render json: {errors: new_item.errors}
    end
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: {errors: new_item.errors}
    end
  end

  def destroy
    render json: @item.destroy
  end

  def get_todo_items
    todo_items = Item.get_todo_items
    render json: todo_items
  end

  def get_completed_items
    completed_items = Item.get_completed_items
    render json: completed_items
  end

  private

  def get_item
    @item = Item.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:todo)
  end
end

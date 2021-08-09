class Api::ClocksController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :create, :update, :destroy]
  before_action :get_note, only: [:show, :update, :destroy]

  def index
    render json: @current_user.clocks.all
  end

  def show
    render json: @clock
  end

  def create
    new_clock = @current_user.clocks.new(clock_params)

    if (new_clock.save)
      render json: new_clock
    else
      render json: {errors: new_clock.errors}
    end
  end

  def update
    if (@clock.update(clock_params))
      render json: @clock 
    else
      render json: {errors: @clock.errors}
    end
  end

  def destroy
    render json: @clock.destroy
  end

  private
  
  def get_clock
    @clock = @current_user.clocks.find(params[:id])
  end

  def clock_params
    params.require(:clock).permit(:show, :str, :ticking, :timezone)
  end

end

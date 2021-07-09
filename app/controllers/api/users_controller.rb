class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def edit_user
    user = current_user
    if user.update(user_params)
      render json: user
    else
      render json: { errors: user.errors }, status: :unprocessable_entity 
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :nickname)
  end
end

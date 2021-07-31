class Api::SubjectsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :create, :update, :destroy]
  before_action :get_subjects, only: [:show, :update, :destroy]


  def index
    render json: @current_user.subjects.all
  end

  def show
    render json: @subject
  end

  def create
    new_subject = @current_user.subjects.new(subject_params)

    if (new_subject.save) 
      render json: new_subject
    else
      render json: {errors: new_subject.errors}
    end
  end

  def update 
    if (@subject.update(subject_params))
      render json: @subject
    else
      render json: {errors: new_subject.errors}
    end
  end

  def destroy
    render json: @subject.destroy
  end


  private

  def get_subjects 
    @subject = @current_user.subjects.find(params[:id])
  end

  def subject_params
    params.require(:subject).permit(:name, :description, :starred)
  end

end

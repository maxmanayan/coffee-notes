class Api::NotesController < ApplicationController
  before_action :get_note, only: [:show, :update, :destroy]

  def index 
    render json: Note.all
  end

  def show
    render json: @note
  end

  def create
    new_note = Note.new(note_params)

    if (new_note.save)
      render json: new_note
    else
      render json: {errors: new_note.errors}
    end
  end

  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: {errors: new_note.errors}
    end
  end

  def destroy
    render json: @note.destroy
  end

  def get_todo_notes
    todo_notes = Note.get_todo_notes
    render json: todo_notes
  end

  def get_completed_notes
    completed_notes = Note.get_completed_notes
    render json: completed_notes
  end

  private

  def get_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:title, :body, :text)
  end
end

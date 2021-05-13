Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do 
    resources :notes 

    get "/get_todo_notes", to: "notes#get_todo_notes"
    get "/get_completed_notes", to: "notes#get_completed_notes"
  end
end

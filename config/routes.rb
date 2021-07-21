Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do 
    resources :users do
      resources :notes do 
        resources :items
      end
      resources :subjects
    end

    get "/users/:user_id/get_todo_notes", to: "notes#get_todo_notes"
    get "/users/:user_id/get_completed_notes", to: "notes#get_completed_notes"
    put "/users/:user_id/edit_user", to: "users#edit_user"
  end
  get '*other', to: 'static#index'
end

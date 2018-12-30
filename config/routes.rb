Rails.application.routes.draw do
  root "index#index"
  get "api/all", to: "index#all"

  namespace :api do
    resources :tasks, except: [:new, :edit]
    resources :tags, only: [:index, :create, :destroy]
  end
end

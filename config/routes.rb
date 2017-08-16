Rails.application.routes.draw do
  root to: "pages#home"

  get "auth/github/callback" => "sessions#create"
  get "logout" => "sessions#destroy"
end

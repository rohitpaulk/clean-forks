Rails.application.routes.draw do
  root to: "pages#home"

  get "auth/github/callback" => "sessions#create"
  get "logout" => "sessions#destroy"

  get "api/v1/user" => "users#show_current"
end

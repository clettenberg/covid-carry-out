Rails.application.routes.draw do
  root to: "home#index"

  scope "api" do
    resources :restaurants, only: [:index], controller: "api/restaurants"
  end
end

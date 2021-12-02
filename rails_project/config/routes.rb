Rails.application.routes.draw do
  resources :recording
  # resources :user, only: [:new, :index]

  root 'user#index', as: 'home'

  get 'login', to: 'user#login', as: 'login'
  post 'logout', to: 'user#logout', as: 'logout'
  get '/auth/:provider/callback' => 'user#googleAuth'
  post '/auth/:provider/callback' => 'user#googleAuth'
  get 'auth/failure', to: 'user#login'

  ##redirect everything to root
  # get '*path' => redirect('/')
end

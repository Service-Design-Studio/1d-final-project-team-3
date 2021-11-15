Rails.application.routes.draw do
  resources :recording
  resources :user, only: [:new, :index]

  root 'user#index', as: 'home'

  get '/login', to: 'user#new', as: 'login'
  post '/user/new', to: 'user#new'
  get '/auth/:provider/callback' => 'user#googleAuth'
  get 'auth/failure', to: redirect('/')

  ##redirect everything to root
  # get '*path' => redirect('/')
end

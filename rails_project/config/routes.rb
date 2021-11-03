Rails.application.routes.draw do
  get 'home/index'
  get 'recording/save_video'
  get 'recording/index'
  root 'home#index'
  # mount ActionCable.server => '/recording/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

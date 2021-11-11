Rails.application.routes.draw do

  # #Recording logs page
  # get '/recording', to 'recording#index', as: 'recording_path' 
  
  # #Live Recording Page
  # post '/recording/create', to 'recording#create', as: 'create_recording_path'
  # get '/recording/new', to 'recording#new', as: 'new_recording_path'

  # #Edit Recording Page
  # get '/recording/:id/edit', to 'recording#edit', as: 'update_recording_path'
  # put 'recording/:id', to 'recording#update', as: 'edit_recording_path'

  # #Individual Recording Page
  # get 'recording/:id', to 'recording#show', as: 'show_recording_path'
  # delete '/recording/:id', to 'recording#destroy', as: 'destroy_recording_path'
  
  resources :recording
  
  #Home page
  get '/', to: 'home#index', as: 'home'
  root 'home#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

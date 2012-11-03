Tenk::Application.routes.draw do
  resources :activity_types

  resources :activities

  devise_for :users

  root :to => 'pages#home'
  get 'home' => 'pages#home'
  get 'ipsum' => 'pages#ipsum'
  get 'user' => 'pages#user'

end

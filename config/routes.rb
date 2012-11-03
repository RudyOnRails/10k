Tenk::Application.routes.draw do
  devise_for :users

  root :to => 'pages#home'
  get 'home' => 'pages#home'

end

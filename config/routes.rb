Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' },
                     skip: %i[sessions registrations]

  devise_scope :user do
    get '/users', to: 'devise/sessions#new', as: :new_user_session
    post '/users/sign_in', to: 'devise/sessions#create', as: :user_session
    delete '/users/sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end

  root to: 'pages#home'
  resources :bookings
  resources :matches

  get '/profile', to: 'users#profile'
  get '/ranking', to: 'pages#ranking'
  get '/current_user_id', to: 'users#current_user_id'

end

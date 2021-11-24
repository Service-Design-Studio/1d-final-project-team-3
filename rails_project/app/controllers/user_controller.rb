class UserController < ApplicationController
  skip_before_action :require_login, only: [:login, :googleAuth]

  def index
    @user = current_user
    p session[:user_id]
    unless logged_in?
      redirect_to action: "new"
    end
  end

  def login
  end

  def logout
    session.clear
    redirect_to login_path
  end

  def googleAuth
    # Get access tokens from the google server
    p "google auth accessed!"
    access_token = auth
    @user = User.from_omniauth(access_token)
    # Access_token is used to authenticate request made from the rails application to the google server
    @user.google_token = access_token.credentials.token
    # Refresh_token to request new access_token
    # Note: Refresh_token is only sent once during the first request
    refresh_token = access_token.credentials.refresh_token
    @user.google_refresh_token = refresh_token if refresh_token.present?
    @user.save
    session[:user_id] = @user.id
    p User.all
    redirect_to home_path
  end

  private
  def auth
    request.env['omniauth.auth']
  end
end

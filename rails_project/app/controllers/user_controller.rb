class UserController < ApplicationController
  skip_before_action :require_login, only: [:new, :googleAuth, :index]

  def index
    @user = current_user
    unless logged_in?
      redirect_to action: "new"
    end
  end

  def new
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
    redirect_to home_path
  end

    #logout
  def logout
    session.clear
    redirect_to home_path
  end

  private
  def auth
    request.env['omniauth.auth']
  end
end

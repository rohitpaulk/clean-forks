class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    return nil unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

  def login(user)
    session[:user_id] = user
  end

  def logout
    session.delete(:user_id)
  end
end

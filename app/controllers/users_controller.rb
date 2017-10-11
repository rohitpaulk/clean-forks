class UsersController < ApplicationController
  def show_current
    render :json => current_user
  end
end

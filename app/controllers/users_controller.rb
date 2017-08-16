class UsersController < ApplicationController
  def show_current
    render :json => {
      username: current_user.username,
      avatar_url: current_user.avatar_url
    }
  end
end

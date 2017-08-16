class SessionsController < ApplicationController
  def create
    auth_details = request.env["omniauth.auth"]
    id = auth_details["uid"]
    username = auth_details["info"]["nickname"]
    access_token = auth_details["credentials"]["token"]
    avatar_url = auth_details["info"]["image"]

    # TODO: Check expiry?

    user = User.find_by_github_id(id)
    unless user
      user = User.create!(
        github_id: id,
        username: username,
        access_token: access_token,
        avatar_url: avatar_url
      )
    end

    login(user)
    redirect_to root_url
  end

  def destroy
    logout

    redirect_to root_url
  end
end

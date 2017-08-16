class PagesController < ApplicationController
  def home
    render "login" unless current_user
  end
end

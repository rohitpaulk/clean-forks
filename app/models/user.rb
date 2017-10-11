class User < ApplicationRecord
  has_many :git_repositories

  validates :username, presence: true
  validates :avatar_url, presence: true
  validates :access_token, presence: true
end

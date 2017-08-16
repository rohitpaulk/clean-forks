class User < ApplicationRecord
  validates :username, presence: true
  validates :avatar_url, presence: true
  validates :auth_token, presence: true
end

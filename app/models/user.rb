class User < ApplicationRecord
  has_many :git_repositories

  validates :username, presence: true
  validates :avatar_url, presence: true
  validates :access_token, presence: true

  def as_json(opts = {})
    {
      username: username,
      avatar_url: avatar_url,
      git_repositories_synced_at: git_repositories_synced_at_unix
    }
  end

  def git_repositories_synced_at_unix
    if git_repositories_synced_at.nil?
      0
    else
      234 # TODO: Pick value
    end
  end
end

class GitRepository < ApplicationRecord
  belongs_to :user

  validates :description, presence: true
  validates :parent_name_with_owner, presence: true
  validates :forked_at, presence: true
  validates :user, presence: true
end

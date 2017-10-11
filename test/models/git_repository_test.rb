require 'test_helper'

class GitRepositoryTest < ActiveSupport::TestCase
  test "has a valid factory" do
    FactoryGirl.create(:git_repository)
  end

  test "belongs to a user" do
    user = FactoryGirl.create(:user)
    repo = FactoryGirl.create(:git_repository, user: user)

    assert_equal(user.id, repo.user.id)
  end
end

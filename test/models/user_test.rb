require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "it has a valid factory" do
    FactoryGirl.create(:user)
  end

  test "has many repos" do
    user = FactoryGirl.create(:user)

    assert_equal(0, user.git_repositories.count)

    FactoryGirl.create(:git_repository, user: user)
    assert_equal(1, user.git_repositories.count)

    FactoryGirl.create(:git_repository, user: user)
    assert_equal(2, user.git_repositories.count)
  end

  test "#as_json returns proper resource" do
    user = FactoryGirl.create(:user)
    json = user.as_json

    assert_equal(user.username, json[:username])
  end

  test "#as_json returns 0 if synced_at is nil" do
    user = FactoryGirl.create(:user, git_repositories_synced_at: nil)
    json = user.as_json

    assert_equal(0, json[:git_repositories_synced_at])
  end

  test "#as_json returns > 0 if synced_at is nil" do
    user = FactoryGirl.create(:user, git_repositories_synced_at: Time.now)
    json = user.as_json

    assert(json[:git_repositories_synced_at] > 0)
  end
end

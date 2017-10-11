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
end

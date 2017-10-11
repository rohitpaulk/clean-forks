require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "it has a valid factory" do
    FactoryGirl.create(:user)
  end
end

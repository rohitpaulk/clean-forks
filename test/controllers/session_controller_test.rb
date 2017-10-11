require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "#create should create user if not exists" do
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(:github, {
      uid: 'github_id',
      info: { nickname: "rohitpaulk", image: "avatar_url" },
      credentials: { token: "dummy_token" }
    })

    env_hash = { "omniauth.auth" => OmniAuth.config.mock_auth[:github] }

    assert_changes -> { User.count }, from: 0, to: 1 do
      get "/auth/github/callback", env: env_hash
    end

    assert_response(:redirect)

    assert_equal(1, User.count)
    user = User.first

    assert_equal(user.github_id, "github_id")
    assert_equal(user.username, "rohitpaulk")
  end

  test "#create picks user if it already exists" do
    skip "Not implemented yet"
  end
end

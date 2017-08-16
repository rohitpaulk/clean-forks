Rails.application.config.middleware.use OmniAuth::Builder do
    secrets = Rails.application.secrets
    provider :github, secrets.github_client_id, secrets.github_client_secret
end

class AddGitReposLastSyncedToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :git_repositories_synced_at, :timestamp
  end
end

class AddGitReposTable < ActiveRecord::Migration[5.1]
  def change
    create_table :git_repositories do |t|
      t.string :parent_name_with_owner
      t.string :description
      t.timestamp :forked_at
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

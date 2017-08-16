class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :avatar_url
      t.string :github_id
      t.string :access_token

      t.timestamps
    end
  end
end

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.date :create_date
      t.date :last_session
      t.timestamps
    end
  end
end

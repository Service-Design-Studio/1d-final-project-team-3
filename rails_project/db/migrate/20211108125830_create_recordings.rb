class CreateRecordings < ActiveRecord::Migration[6.1]
  def change
    create_table :recordings do |t|
      #there will be an auto generated id column
      t.integer :video_id
      t.date :date
      t.string :title
      t.float :duration
      t.string :video_uri
      t.text :police_notes
      t.text :transcription
      t.integer :phone_IMEI
      t.timestamps #
    end
  end
end
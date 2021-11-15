class CreateRecordings < ActiveRecord::Migration[6.1]
    def change
      create_table :recordings do |t|
        #there will be an auto generated id column
        t.string :title
        t.float :duration
        t.text :police_notes
        t.text :transcription
        t.integer :phone_IMEI
        t.timestamps #
      end
    end
  end  

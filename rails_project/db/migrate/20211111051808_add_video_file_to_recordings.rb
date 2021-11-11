class AddVideoFileToRecordings < ActiveRecord::Migration[6.1]
  def change
    add_column :recordings, :video_file, :active_storage_attachments
  end
end

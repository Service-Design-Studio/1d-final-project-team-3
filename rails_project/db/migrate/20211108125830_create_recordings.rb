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

    create_table :users do |t|
      t.string :email
      t.string :username
      t.date :create_date
      t.date :last_session
      t.timestamps
    end

    add_column :users, :google_token, :string
    add_column :users, :google_refresh_token, :string

    add_reference :recordings, :user, null: false, foreign_key: true

    create_table :active_storage_blobs do |t|
      t.string   :key,          null: false
      t.string   :filename,     null: false
      t.string   :content_type
      t.text     :metadata
      t.string   :service_name, null: false
      t.bigint   :byte_size,    null: false
      t.string   :checksum,     null: false
      t.datetime :created_at,   null: false

      t.index [ :key ], unique: true
    end

    create_table :active_storage_attachments do |t|
      t.string     :name,     null: false
      t.references :record,   null: false, polymorphic: true, index: false
      t.references :blob,     null: false

      t.datetime :created_at, null: false

      t.index [ :record_type, :record_id, :name, :blob_id ], name: "index_active_storage_attachments_uniqueness", unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end

    create_table :active_storage_variant_records do |t|
      t.belongs_to :blob, null: false, index: false
      t.string :variation_digest, null: false

      t.index %i[ blob_id variation_digest ], name: "index_active_storage_variant_records_uniqueness", unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end

    # add_reference :recordings, :active_storage_attachments, null: false, foreign_key: true
    # add_column :recordings, :video_file, :active_storage_attachments

  end
end
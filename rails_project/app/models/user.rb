class User < ApplicationRecord
    has_many :video_uris, :video_ids
    validates :username, :email
end

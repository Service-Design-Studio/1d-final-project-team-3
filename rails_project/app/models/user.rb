class User < ApplicationRecord
    # has_many :recordings
    validates :username, :email, presence: true
    validates :username, :email, uniqueness: true

    def self.from_omniauth(auth)
        where(email: auth.info.email).first_or_initialize do |user|
        user.username = auth.info.name
        user.email = auth.info.email
        # if auth.info.uid
        #     user.uid = auth.info.uid
        end
    end
end

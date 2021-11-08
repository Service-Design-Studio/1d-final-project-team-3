class Recording < ApplicationRecord
    belongs_to :username
    validate :id, presence: true
end

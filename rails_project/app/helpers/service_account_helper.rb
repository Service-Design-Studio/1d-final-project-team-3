require 'singleton'
module ServiceAccountHelper
    class ServiceAccountHelper
        include Singleton
            def initialize
                p 'initializing service account'
                scope = 'https://www.googleapis.com/auth/cloud-platform'
                @authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
                json_key_io: File.open(Rails.root.join("keys","d-final-project-team-3-3f8b143456d4.keyfile").to_s),
                scope: scope)
                @token = @authorizer.fetch_access_token!
                p 'initialized service account'
            end

            def token
                @token
            end
    end
end
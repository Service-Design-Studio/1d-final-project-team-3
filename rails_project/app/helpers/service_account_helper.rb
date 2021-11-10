require 'singleton'
module ServiceAccountHelper
    class ServiceAccountHelper
        include Singleton
            def initialize
                p 'initializing service account'
                scope = 'https://www.googleapis.com/auth/cloud-platform'
                @authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
                json_key_io: File.open("#{__dir__}/keys/sds-final-project-team-3-95b5816a9039.json"),
                scope: scope)
                @token = @authorizer.fetch_access_token!
                p 'initialized service account'
            end

            def token
                @token
            end
    end
end
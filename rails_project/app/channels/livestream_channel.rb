require "google/cloud/automl/v1"
require "base64"
require 'uri'
require 'net/http'

# require "logger"

# module MyLogger
#   LOGGER = Logger.new $stderr, level: Logger::WARN
#   def logger
#     LOGGER
#   end
# end

# # Define a gRPC module-level logger method before grpc/logconfig.rb loads.
# module GRPC
#   extend MyLogger
# end

class LivestreamChannel < ApplicationCable::Channel
  include ServiceAccountHelper
  @@ENDPOINT_ID="8113384262289326080"
  @@PROJECT_ID="1055029069246"
  @@MODEL_ID="2303173394981453824"
  @@LOCATION="us-central1"
  @@uri= URI.parse("https://us-central1-aiplatform.googleapis.com/v1/projects/#{@@PROJECT_ID}/locations/us-central1/endpoints/#{@@ENDPOINT_ID}:predict")
  @@ServiceAccount = ServiceAccountHelper.instance
  # @@AUTOML_CLIENT=Google::Cloud::AutoML::V1::PredictionService::Client.new do |config|
  #     config.credentials = "#{__dir__}/sds-final-project-team-3-95b5816a9039.json"
  #     # config.endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/#{PROJECT_ID}/locations/us-central1/endpoints/#{ENDPOINT_ID}:predict"
  #   end
  
  def subscribed
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # TODO: when press stop at client side
  end

  def receive(data)
    # Data here is received as a base64 encoded blob.
    p "RECEIVED SOCKET DATA"
    begin
      p "DECODE DATA"
      image_bytes = data["data"]

      p "sending data"
      response = self.create_request image_bytes

      p response.body
    rescue => exception
      puts ("EXCEPTION")
      # puts(exception)
    end

    # TODO: send data back to client.
  end

  def create_request(image_bytes)
    # Create a request. To set request fields, pass in keyword arguments.
    begin
      p "creating http"
      http = Net::HTTP.new(@@uri.host, @@uri.port)
      http.use_ssl = true
      p "creating request"
      request = Net::HTTP::Post.new(@@uri.request_uri)
      p "setting headers"
    #   request.initialize_http_header(
    #     "Authorization" => "Bearer #{@@ServiceAccount.token["access_token"]}",
    #     "Content-Type" => "application/json"
    #  )
      request["Authorization"] = "Bearer #{@@ServiceAccount.token["access_token"]}"
      request["Content-Type"] = "application/json"
      request["User-Agent"] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
      p request['Authorization']
      p "forming request body"
      request.body = {
        "instances":[{
          "content": image_bytes
        }]
        }.to_json
      p 'sending request'
      response = http.request(request)
      p 'getting response'
      response
    rescue => exception
      p ("EXCEPTION")
      p exception
    end
  end
end

require "google/cloud/automl/v1"
require "base64"

require "logger"

module MyLogger
  LOGGER = Logger.new $stderr, level: Logger::WARN
  def logger
    LOGGER
  end
end

# Define a gRPC module-level logger method before grpc/logconfig.rb loads.
module GRPC
  extend MyLogger
end

class LivestreamChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed

    # TODO: when press stop at client side
  end

  def receive(data)
    # Data here is received as a base64 encoded blob.
    puts('DATA IS BEING RECEIVED IN BACKEND CODE')
    ENDPOINT_ID="8113384262289326080"
    PROJECT_ID="1055029069246"
    # TODO: process blob information (ML)
    client = Google::Cloud::AutoML::V1::PredictionService::Client.new do |config|
      config.credentials = "#{__dir__}/sds-final-project-team-3-95b5816a9039.json"
      # config.endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/#{PROJECT_ID}/locations/us-central1/endpoints/#{ENDPOINT_ID}:predict"
    end
    # Create a request. To set request fields, pass in keyword arguments.
    puts('START OF REQUEST')
    request = Google::Cloud::AutoML::V1::PredictRequest.new
    puts('REQUEST INITIALIZED')
    request.name = "untitled_1636363951941_202111894247"
    puts('NAME SET')
    request.payload = Google::Cloud::AutoML::V1::ExamplePayload.new
    puts('PAYLOAD SET')

    request.payload.image = Google::Cloud::AutoML::V1::Image.new
    puts('IMAGE SET')
    # decoded_data = Base64.decode64 data
    # puts(decoded_data)
    request.payload.image.image_bytes = Base64.decode64 data["data"]
    puts('IMAGE_BYTES SET')

    # Call the predict method.
    puts('SENDING REQUEST')
    begin
      result = client.predict request

    rescue => exception
      puts(exception)
    end
    # The returned object is of type Google::Cloud::AutoML::V1::PredictResponse.
    p result
    
    # TODO: send data back to client.
  end
end

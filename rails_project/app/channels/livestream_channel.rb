require "google/cloud/automl/v1"
require "base64"

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
  @@ENDPOINT_ID="8113384262289326080"
  @@PROJECT_ID="1055029069246"
  @@MODEL_ID="untitled_1636363951941_202111894247"
  @@LOCATION="us-central1"
  @@AUTOML_CLIENT=Google::Cloud::AutoML::V1::PredictionService::Client.new do |config|
      config.credentials = "#{__dir__}/sds-final-project-team-3-95b5816a9039.json"
      # config.endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/#{PROJECT_ID}/locations/us-central1/endpoints/#{ENDPOINT_ID}:predict"
    end

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
      image_bytes = Base64.decode64 data["data"]

      p "calling create req func"
      request = self.create_request image_bytes
      p "SENDING REQUEST"
      result = @@AUTOML_CLIENT.predict request
      p result.type

    rescue => exception
      puts(exception)
    end

    # TODO: send data back to client.
  end

  def create_request(image_bytes)
    # Create a request. To set request fields, pass in keyword arguments.
    begin
      p "creating request problem"
      image_obj = Google::Cloud::AutoML::V1::Image.new image_bytes:image_bytes
      payload = Google::Cloud::AutoML::V1::ExamplePayload.new image:image_obj
      full_model_path = Google::Cloud::AutoML::V1::PredictionService::Paths.model_path project:@@PROJECT_ID, location:@@LOCATION, model:@@MODEL_ID

      p "forming request object"
      request = Google::Cloud::AutoML::V1::PredictRequest.new name:full_model_path, payload:payload
    rescue => exception
      p exception
    end
  end
end

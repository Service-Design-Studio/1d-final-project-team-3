require "google/cloud/automl/v1"
require "base64"
require "json"
require "rest-client"

class LivestreamChannel < ApplicationCable::Channel
  #PBY's alphabet handsign ML model details
  @@PROJECT_ID="1075614731933"
  @@ENDPOINT_ID="3042331081870147584"
  @@LOCATION="us-central1"
  #this is hacky way of using my login
  @@AUTH_TOKEN=%x/gcloud auth print-access-token/
  

  def subscribed
    # p "yo"
    # stream_from "livestream_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # TODO: when press stop at client side
  end

  def receive(data)
    # Data here is received as a hash with a base64 encoded blob.
    p "received data"

    begin
      response = self.send_request json_obj:self.create_json(img64:data["data"])
      p response.body
    rescue => exception
      p exception
    end
  end

  def send_request(json_obj:)
    url = "https://us-central1-aiplatform.googleapis.com/v1/projects/#{@@PROJECT_ID}/locations/#{@@LOCATION}/endpoints/#{@@ENDPOINT_ID}:predict"
    token = "Bearer " + @@AUTH_TOKEN
    # p token
    header = {"Content-Type":"application/json", "Authorization":token}
    RestClient.post(url, json_obj, headers=header)
  end

  def create_json(img64:, confidence_threshold:0.7, max_predictions:1)
    content = [{"content": img64}]
    params = {"confidenceThreshold":confidence_threshold, "maxPredictions":max_predictions}
    payload = {"instances":content, "parameters":params}
    File.write('./sample_payload.json', JSON.dump(payload))
    inp_obj = JSON.generate(payload)
  end
end

# @@AUTOML_CLIENT=Google::Cloud::AutoML::V1::PredictionService::Client.new do |config|
  #     config.credentials = "#{__dir__}/sds-final-project-team-3-95b5816a9039.json"
  #     # config.endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/#{PROJECT_ID}/locations/us-central1/endpoints/#{ENDPOINT_ID}:predict"
  #   end

# begin
    #   p "DECODE DATA"
    #   image_bytes = Base64.decode64 data["data"]

    #   p "calling create req func"
    #   request = self.create_request image_bytes
    #   p "SENDING REQUEST"
    #   result = @@AUTOML_CLIENT.predict request
    #   p result.type

    # rescue => exception
    #   puts(exception)
    # end

    # TODO: send data back to client.

# def create_request(image_bytes)
  #   Create a request. To set request fields, pass in keyword arguments.
  #   begin
  #     p "creating request problem"
  #     image_obj = Google::Cloud::AutoML::V1::Image.new image_bytes:image_bytes
  #     payload = Google::Cloud::AutoML::V1::ExamplePayload.new image:image_obj
  #     full_model_path = Google::Cloud::AutoML::V1::PredictionService::Paths.model_path project:@@PROJECT_ID, location:@@LOCATION, model:@@MODEL_ID

  #     p "forming request object"
  #     request = Google::Cloud::AutoML::V1::PredictRequest.new name:full_model_path, payload:payload
  #   rescue => exception
  #     p exception
  #   end
  # end
# require "google/cloud/automl/v1"
require "base64"
require "json"
require "rest-client"
# require 'uri'
# require 'net/http'

class LivestreamChannel < ApplicationCable::Channel
  include ServiceAccountHelper
  ## Gab model's endpoint
  # @@ENDPOINT_ID="8113384262289326080"
  # @@PROJECT_ID="1055029069246"
  ## Old closed off endpoint
  # @@ENDPOINT_ID="926202206959435776"
  ## Endpoint for Sprint 3 (25th Nov)
  @@ENDPOINT_ID="1021622224064348160"
  @@PROJECT_ID="858374279331"
  @@LOCATION="us-central1"
  @@URI="https://us-central1-aiplatform.googleapis.com/v1/projects/#{@@PROJECT_ID}/locations/#{@@LOCATION}/endpoints/#{@@ENDPOINT_ID}:predict"
  @@ServiceAccount = ServiceAccountHelper.instance
  
  def subscribed
    stream_from "LivestreamChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # TODO: when press stop at client side
  end

  def receive(data)
    # Data here is received as a hash with a base64 encoded blob.
    p "RECEIVED SOCKET DATA"
    begin
      p "DECODE DATA"
      payload = self.create_payload(img64:data["data"], confidence_threshold:0.5, max_predictions:1)

      p "sending data"
      response = self.send_request payload:payload
      data = JSON.parse(response.body)

      # Get display name
      p data["predictions"][0]
    rescue => exception
      puts(exception)
    end

    #Sending transcription data back
    begin
      ActionCable.server.broadcast("LivestreamChannel",{"data" => data["predictions"][0]["displayNames"][0]})
    rescue=> exception
      puts exception
    end
  end

  def send_request(payload:)
    begin
      token = "Bearer #{@@ServiceAccount.token["access_token"]}"
      header = {"Content-Type":"application/json", "Authorization":token}
      RestClient.post(@@URI, payload, headers=header)
    rescue => exception
      p exception
    end
  end

  def create_payload(img64:, confidence_threshold:0, max_predictions:1)
    payload = {
        "instances":[{
          "content": img64
        }],
        "parameters": {
          "confidenceThreshold": confidence_threshold,
          "maxPredictions": max_predictions
        }
      }.to_json
  end
end

require "google/cloud/automl/v1"
require "base64"
require "json"
require "rest-client"
require 'uri'
require 'net/http'

class LivestreamChannel < ApplicationCable::Channel
  include ServiceAccountHelper
  @@ENDPOINT_ID="8113384262289326080"
  @@PROJECT_ID="1055029069246"
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
      payload = self.create_payload(img64:data["data"])

      p "sending data"
      response = self.send_request payload:payload

      data = JSON.parse(response.body)

      # Get display name
      p data["predictions"][0]["displayNames"][0]
    rescue => exception
      puts(exception)
    end
    begin
      ActionCable.server.broadcast("LivestreamChannel",{"data" => data["predictions"][0]["displayNames"][0]})
    rescue=> exception
      puts exception
    end
    # TODO: send data back to client.
  end

  def send_request(payload:)
    begin
    #   p "creating http"
    #   http = Net::HTTP.new(@@uri.host, @@uri.port)
    #   http.use_ssl = true
    #   p "creating request"
    #   request = Net::HTTP::Post.new(@@uri.request_uri)
    #   p "setting headers"
    # #   request.initialize_http_header(
    # #     "Authorization" => "Bearer #{@@ServiceAccount.token["access_token"]}",
    # #     "Content-Type" => "application/json"
    # #  )
    #   request["Authorization"] = "Bearer #{@@ServiceAccount.token["access_token"]}"
    #   request["Content-Type"] = "application/json"
    #   request["User-Agent"] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
    #   p request['Authorization']
    #   p "forming request body"
      
    #   p 'sending request'
    #   response = http.request(request)
    #   p 'getting response'
    #   response
      token = "Bearer #{@@ServiceAccount.token["access_token"]}"
      header = {"Content-Type":"application/json", "Authorization":token}
      RestClient.post(@@URI, payload, headers=header)
    rescue => exception
      p exception
    end
  end

  def create_payload(img64:, confidence_threshold:0.3, max_predictions:1)
    payload = {
        "instances":[{
          "content": img64
        }],
        "parameters": {
          "confidenceThreshold": confidence_threshold,
          "maxPredictions": max_predictions
        }
      }.to_json
        
    # content = [{"content": img64}]
    # params = {"confidenceThreshold":confidence_threshold, "maxPredictions":max_predictions}
    # payload = {"instances":content, "parameters":params}
    # File.write('./sample_payload.json', JSON.dump(payload))
    # payload
  end
end
class LivestreamChannel < ApplicationCable::Channel
  def subscribed
    stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed

    # TODO: when press stop at client side
  end

  def receive(data)
    # Data here is received as a base64 encoded blob.
    puts(data)
    # TODO: process blob information (ML)

    # TODO: send data back to client.
  end
end

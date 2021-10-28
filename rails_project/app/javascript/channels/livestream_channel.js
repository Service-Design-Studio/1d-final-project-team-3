import { createConsumer } from "@rails/actioncable"

const App = {}
App.cable = createConsumer()
App.appearance = App.cable.subscriptions.create("LivestreamChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log('CONNECTED TO LIVESTREAM')
    const video = document.getElementById('live')
    if(video){
      // once video is connected, we "stream"
      console.log('VIDEO CONNECTED')
      video.addEventListener('playing',(evt)=>{
        console.log("LIVESTREAM IS FETCHING DATA",evt.target.captureStream())
        const mediaStream = evt.target.captureStream()
        const mediaRecorder = new MediaRecorder(mediaStream)
        mediaRecorder.ondataavailable = event => {
          //here, event.data is a blob of the image.
          var reader = new FileReader();
          reader.readAsDataURL(event.data); 
          reader.onloadend = function() {
            var base64data = reader.result;                
            App.appearance.send({data : base64data})
          }
        };
        // this argument inside .start() is the interval to send (in ms)
        mediaRecorder.start(1000)
      })
    }
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log('DISCONNECTED TO LIVESTREAM')
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data)
  }
});

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
        // TEMPORARY FOR IMAGE GRABBING
        const track = mediaStream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        setInterval(()=>{
          imageCapture.grabFrame().then(
            (imageBitmap)=>{
              let canvas = document.createElement('canvas')
              canvas.getContext('bitmaprenderer').transferFromImageBitmap(imageBitmap)
              let base64data = canvas.toDataURL().slice(22)
              App.appearance.send({data : base64data})
          })
        },1000)
        // const mediaRecorder = new MediaRecorder(mediaStream,{mimeType:"image/jpeg"})
        // mediaRecorder.ondataavailable = event => {
        //   //here, event.data is a blob of the image.
        //   var reader = new FileReader();
        //   reader.readAsDataURL(event.data); 
        //   reader.onloadend = function() {
        //     var base64data = reader.result; 
        //     console.log("SENDING DATA NOW")
        //     // App.appearance.send({data: "WEEEEEE"})
        //     App.appearance.send({data : base64data})
        //   }
        // };
        // // this argument inside .start() is the interval to send (in ms)
        // mediaRecorder.start(5000)
      })
    }
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log('DISCONNECTED TO LIVESTREAM')
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log('this is clientside receiving something')
    console.log(data)
    //data comes in every 1second
    const start = document.getElementById('start')
    // we are currently recording...
    if(start.textContent === 'Stop'){
      const text = document.getElementById('transcription')
      const lastText = text.innerHTML.split(' ')
      if(lastText.at(-2) !== data.data){
        text.innerHTML = text.innerHTML + (data.data ? data.data + ' ' : '')
      }
    }
  }
});

import App from "channels/livestream_channel"

window.onload = initRecordVideo

function initRecordVideo(){
  const INTERVAL = 1500
  const btn = document.getElementById("control-button")
  const player = document.getElementById("video-player")
  const text = document.getElementById('transcription')
  const form = document.getElementById('video-form')
  // const token = document.getElementById('token')
  var textInterval = null
  var streamInterval = null
  const streamObj = startVideo()
  window.onbeforeunload = stopVideo

  btn.addEventListener("click", btnOnClick);

  //Subscribe to channel
  console.log("Subscribing to LivestreamChannel...")
  App.livestream = App.cable.subscriptions.create({
    channel: "LivestreamChannel",
    userId: "proxy_user" //TODO: Change to proper userId
  }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('CONNECTED TO LIVESTREAM')
    },

    disconnected() {
      // Called when the subscription has been terminated
      console.log('DISCONNECTED FROM LIVESTREAM')
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log('Receiving text data from livestream...')
      console.log(data)
      //data comes in every 1second
      // we are currently recording...
      if (btn.dataset.isRecording) {
        const lastText = text.innerHTML.split(' ')
        if (lastText.at(-2) !== data.data) {
          text.innerHTML = text.innerHTML + (data.data ? data.data + ' ' : '')
        }
      }
    }
  })

  function stopVideo(){
    player.srcObject.getTracks().forEach(track => track.stop());
  }

  function startVideo(){
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      console.log('GOT PERMISSION!!')
      player.srcObject = stream;
      player.onloadedmetadata = function (e) {
        player.play();
      };
      player.captureStream = player.captureStream || player.mozCaptureStream;
      return new Promise(resolve => player.onplaying = resolve);
    });
  }

  function stopRecording(){
    return new Promise(resolve => btn.addEventListener("click", resolve));
  }

  function startRecording(stream){
    const recorder = new MediaRecorder(stream);
    let data = [];
    console.log("Starting to record video stream!");
    recorder.ondataavailable = event => data.push(event.data);
    recorder.start();
    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = event => reject(event.name);
    });
    const recorded = stopRecording().then(
      () => {
        recorder.state == "recording" && recorder.stop();
      }
    );
    return Promise.all([
      stopped,
      recorded
    ])
      .then(() => data);
  }

  function streamFrames() {
    console.log("Streaming frames: ", player.captureStream())
    // Grab an image frame
    const mediaStream = player.captureStream()
    const track = mediaStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    streamInterval = setInterval(() => {
      imageCapture.grabFrame().then(
        (imageBitmap) => {
          let canvas = document.createElement('canvas')
          canvas.getContext('bitmaprenderer').transferFromImageBitmap(imageBitmap)
          let base64data = canvas.toDataURL().slice(22)
          console.log("Sending image data");
          App.livestream.send({ data: base64data })
        })
    }, INTERVAL)
  }

  function streamText(){
    var startTime = dayjs('2018-04-04T16:00:00.000Z')
    var count = 1;
    text.innerHTML = `00:00:00,000 --> 00:00:10,000: \n`
    //Every 10 seconds, we take the transcription, add it somewhere, then clear the transcription
    textInterval = setInterval(() => {
      const startIntervalTime = startTime.add(count * 10, 'second')
      count += 1;
      const endIntervalTime = startTime.add(count * 10, 'second')
      text.innerHTML += `\n ${startIntervalTime.format('HH:mm:ss,SSS')} --> ${endIntervalTime.format('HH:mm:ss,SSS')}: \n`
      text.scrollTop = text.scrollHeight
    }, (10000));
  }

  function saveFile(blob){
    var formData = new FormData(form);
    formData.set("recording[video_file]", blob);
    formData.set("recording[title]", dayjs().format('MMMM D, YYYY h:mm A'));
    formData.set("recording[transcription]",text.innerHTML);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/recording");
    xhr.onreadystatechange = function () {
      // return if not ready state 4
      if (this.readyState !== 4) {
        console.log(this.responseText)
        return;
      }
      window.location.pathname = this.responseText
    };
    xhr.send(formData);
  }

  function btnOnClick() {
    if (btn.dataset.isRecording) {
      //reset
      btn.dataset.isRecording = !btn.dataset.isRecording;

      // stop intervals & unsub from channel
      textInterval && clearInterval(textInterval)
      streamInterval && clearInterval(streamInterval)
      App.livestream.unsubscribe()
      console.log("Tying up complete");
      btn.style.background = "#0000FF";
      btn.textContent = "Start"
    } else {
      btn.dataset.isRecording = !btn.dataset.isRecording;

      streamObj.then(() => startRecording(player.captureStream()))
        .then(recordedChunks => {
          const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          console.log("Stopping recording of video stream!");
          saveFile(recordedBlob);
        })
      
      streamFrames()
      streamText()
      btn.style.background = "#FF0000";
      btn.textContent = "Stop"
    }
  }
}


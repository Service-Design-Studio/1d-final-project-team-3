import App from "channels/livestream_channel"

window.onload = initRecordVideo

var text = ``
function initRecordVideo(){
  const INTERVAL = 1500
  const btn = document.getElementById("control-button")
  const player = document.getElementById("video-player")
  const textTranscription = document.getElementById('transcription')
  const form = document.getElementById('video-form')
  // const token = document.getElementById('token')
  var textInterval = null
  var textPlaceholder = ''
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
      //data comes in every 1second
      // we are currently recording...
      if (btn.dataset.isRecording) {
        const lastText = text.split(' ').at(-2).replace('\n','')
        console.log(lastText)
        console.log(data)
        if (data.data != null && data.data != textPlaceholder) {
          textPlaceholder = data.data
          text = text + data.data
          textTranscription.lastElementChild.innerHTML += data.data
          // text = text + (data.data ? data.data + ' ' : '')
          // textTranscription.lastElementChild.innerHTML += (data.data ? data.data + ' ' : '')
        }
      }
    }
  })

  function stopVideo(){
    player.srcObject.getTracks().forEach(track => track.stop());
  }

  function startVideo(){
    return navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment",width: 420 },
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
    text = `00:00:00,000 --> 00:00:10,000: \n`
    createTranscriptionElement('00:00', '')
    //Every 10 seconds, we take the transcription, add it somewhere, then clear the transcription
    textInterval = setInterval(() => {
      const startIntervalTime = startTime.add(count * 10, 'second')
      count += 1;
      const endIntervalTime = startTime.add(count * 10, 'second')
      text += `\n${startIntervalTime.format('HH:mm:ss,SSS')} --> ${endIntervalTime.format('HH:mm:ss,SSS')}: \n`
      createTranscriptionElement(endIntervalTime.format('mm:ss'), '')
      textTranscription.scrollTop = textTranscription.scrollHeight
    }, (10000));
  }

  function createTranscriptionElement(timestamp, content){
    let timestampElement = document.createElement('div')
    timestampElement.className = 'transcription-box-timestramp'
    timestampElement.textContent = timestamp
    textTranscription.appendChild(timestampElement)

    let contentElement = document.createElement('p')
    contentElement.textContent = content
    textTranscription.appendChild(contentElement)
  }

  function saveFile(blob){
    var formData = new FormData(form);
    formData.set("recording[video_file]", blob);
    formData.set("recording[title]", dayjs().format('MMMM D, YYYY h:mm A'));
    formData.set("recording[transcription]",text);
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
      // btn.style.background = "#0000FF";
      // btn.textContent = "Start"
      btn.style.background = "#0000FF";
      btn.textContent = "Saving..."

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


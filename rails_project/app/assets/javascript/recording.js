const initSaveVideo = () => {
  let test = sessionStorage.getItem("derp");
  // let test = sessionStorage.getItem("derp");
  const player = document.getElementById("video_player");
  player.srcObject = test;

  if (test != null) {
    console.log(test);
    // vid_player.src = test;
  }
}

const initRecordVideo = () => {
  console.log('initRecordVideo is starting...');

  let isRecording = false;
  const start = document.getElementById("start");
  // const stop = document.getElementById("stop");
  const live = document.getElementById("live");
  const vid_player = document.getElementById("video_player");

  if (vid_player!= null){
    vid_player.src = sessionStorage.getItem("derp");
  }
  

  const stopVideo = () => {
    live.srcObject.getTracks().forEach(track => track.stop());
  }

  const startVideo = () => {
    return navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      console.log('GOT PERMISSION!!')
      live.srcObject = stream;
      live.onloadedmetadata = function (e) {
        live.play();
      };
      live.captureStream = live.captureStream || live.mozCaptureStream;
      return new Promise(resolve => live.onplaying = resolve);
    });
  }


  const stopRecording = () => {
    return new Promise(resolve => start.addEventListener("click", resolve));
  }

  const startRecording = (stream) => {
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

  function btnOnClick() {
    if (isRecording) {
      isRecording = !isRecording;
      start.style.background = "#0000FF";
      start.textContent = "Start"
      location.href = "save_video"

    } else {
      isRecording = !isRecording;
      start.style.background = "#FF0000";
      start.textContent = "Stop"

      streamObj.then(() => startRecording(live.captureStream()))
        .then(recordedChunks => {
          const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          console.log("Stopping recording of video stream!");
          saveFile(recordedBlob);
          // var bbUrl = URL.createObjectURL(recordedBlob);
          // sessionStorage.setItem("derp",bbUrl);
        })
    }
  }

  const saveFile = (blob) => {
    console.log("SAVING");
    console.log(blob);
    var blobUrl = URL.createObjectURL(blob);
    link.href = blobUrl;
    link.download = "video.webm";
    link.click();
  }

  start.addEventListener("click", btnOnClick);
  var streamObj = startVideo();
  var link = document.createElement("a");
}

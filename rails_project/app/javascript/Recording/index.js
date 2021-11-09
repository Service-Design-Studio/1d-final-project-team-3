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
      // TODO: POST to recording#create to save the video
      fetch('http://localhost:3000/recording/',{method:"POST", redirect: 'follow'})
      .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        }
    })

      // xhr.setRequestHeader('Content-Type', 'application/json');
      // xhr.send(JSON.stringify({
      //   value: value
      // }));
      // location.href = "/recording/1/edit"

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



export {initRecordVideo, initSaveVideo}

// const initRecordVideo = () => {
//   console.log('initRecordVideo is starting...');

//   let isRecording = false;
//   const start = document.getElementById("start");
//   const stop = document.getElementById("stop");

//   const stopVideo = () => {
//     live.srcObject.getTracks().forEach(track => track.stop());
//   }

//   const startVideo = () => {
//     return navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       console.log('GOT PERMISSION!!')
//       live.srcObject = stream;
//       live.onloadedmetadata = function (e) {
//         live.play();
//       };
//       live.captureStream = live.captureStream || live.mozCaptureStream;
//       return new Promise(resolve => live.onplaying = resolve);
//     });
//   }


//   const stopRecording = () => {
//     return new Promise(resolve => stop.addEventListener("click", resolve));
//   }

//   const startRecording = (stream) => {
//     const recorder = new MediaRecorder(stream);
//     let data = [];
//     start.style.background = "#FF0000";
//     console.log("Starting to record video stream!");
//     recorder.ondataavailable = event => data.push(event.data);
//     recorder.start();
//     const stopped = new Promise((resolve, reject) => {
//       recorder.onstop = resolve;
//       recorder.onerror = event => reject(event.name);
//     });
//     const recorded = stopRecording().then(
//       () => {
//         recorder.state == "recording" && recorder.stop();
//       }
//     );
//     return Promise.all([
//       stopped,
//       recorded
//     ])
//       .then(() => data);
//   }

//   start.addEventListener("click", () => {
//     streamObj.then(() => startRecording(live.captureStream()))
//       .then(recordedChunks => {
//         const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
//         start.style.background = "#FFFFFF";
//         console.log("Stopping recording of video stream!");
//         saveFile(recordedBlob);
//       })
//   });

//   const saveFile = (blob) => {
//     var blobUrl = URL.createObjectURL(blob);
//     var link = document.createElement("a");
//     link.href = blobUrl;
//     link.download = "video.webm";
//     link.click();
//   }

//   var streamObj = startVideo();
// }

// export { initRecordVideo }


// function RecordVideo() {
//   var isRecording = false;
//   const recordBtn = document.getElementById("recordButton");
//   const videoPlayer = document.getElementById("videoPlayer");
//   var streamObj = startVideo();

//   function stopVideo() {
//     videoPlayer.srcObject.getTracks().forEach(track => track.stop());
//   }

//   function startVideo() {
//     return navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       console.log('GOT PERMISSION!!')
//       videoPlayer.srcObject = stream;
//       videoPlayer.onloadedmetadata = function (e) {
//         videoPlayer.play();
//       };
//       videoPlayer.captureStream = videoPlayer.captureStream || videoPlayer.mozCaptureStream;
//       return new Promise(resolve => videoPlayer.onplaying = resolve);
//     });
//   }

//   function stopRecording() {
//     return new Promise(resolve => this.recordBtn.addEventListener("click", resolve));
//   }

//   function startRecording() {
//     const recorder = new MediaRecorder(stream);
//     let data = [];
//     console.log("Starting to record video stream!");
//     recorder.ondataavailable = event => data.push(event.data);
//     recorder.start();
//     const stopped = new Promise((resolve, reject) => {
//       recorder.onstop = resolve;
//       recorder.onerror = event => reject(event.name);
//     });
//     const recorded = stopRecording().then(
//       () => {
//         recorder.state == "recording" && recorder.stop();
//       }
//     );
//     return Promise.all([
//       stopped,
//       recorded
//     ])
//       .then(() => data);
//   }

//   function btnOnClick() {
//     if (this.isRecording) {
//       this.isRecording = !this.isRecording;
//       this.recordBtn.style.background = "#0000FF";
//       this.recordBtn.textContent = "Start"
//       location.href = "save_video"
//     } else {
//       this.isRecording = !this.isRecording;
//       this.recordBtn.style.background = "#FF0000";
//       this.recordBtn.textContent = "Stop"

//       streamObj.then(() => startRecording(live.captureStream()))
//         .then(recordedChunks => {
//           const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
//           console.log("Stopping recording of video stream!");
//           var bbUrl = URL.createObjectURL(recordedBlob);
//           sessionStorage.setItem("derp", bbUrl);
//         })
//     }
//   }
// }

// export {RecordVideo}
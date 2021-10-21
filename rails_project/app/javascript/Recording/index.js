const initRecordVideo = () => {
  console.log('initRecordVideo is starting...');

  let isRecording = false;
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");

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
    start.style.background = "#FF0000";
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

  start.addEventListener("click", btnOnClick);

  function btnOnClick() {
    if (isRecording) {
      isRecording = !isRecording;
    } else {
      isRecording = !isRecording;
      streamObj.then(() => startRecording(live.captureStream()))
        .then(recordedChunks => {
          const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          start.style.background = "#FFFFFF";
          console.log("Stopping recording of video stream!");
          saveFile(recordedBlob);
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

  var streamObj = startVideo();
  var link = document.createElement("a");
}

export { initRecordVideo }

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



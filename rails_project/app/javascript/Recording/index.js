const initRecordVideo = () => { 
    console.log('initRecordVideo is starting...') 
    
    const start = document.getElementById("start");
    const stop = document.getElementById("stop");
    const live = document.getElementById("live");

    const stopVideo = () => {
      live.srcObject.getTracks().forEach(track => track.stop());
    }

    const startRecording = (stream) => {
        const recorder = new MediaRecorder(stream);
        let data = [];
        recorder.ondataavailable = event => data.push(event.data);
        recorder.start();
        const stopped = new Promise((resolve, reject) => {
          recorder.onstop = resolve;
          recorder.onerror = event => reject(event.name);
        });
        const recorded = stopRecording().then(
          () => {
            stopVideo();
            recorder.state == "recording" && recorder.stop();
          }
        );
        return Promise.all([
          stopped,
          recorded
        ])
        .then(() => data);
    }

    //stop.addEventListener("click", stopVideo);
    start.addEventListener("click", () => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      .then(stream => {
        console.log('this part is running!!')
        live.srcObject = stream;
        live.onloadedmetadata = function(e) {
            live.play();
          };        
        live.captureStream = live.captureStream || live.mozCaptureStream;
        return new Promise(resolve => live.onplaying = resolve);
      });
    });
}

export {initRecordVideo}

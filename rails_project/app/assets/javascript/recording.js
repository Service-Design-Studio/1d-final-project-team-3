var textInterval = null;
var fullTranscription = "";

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
      // stop intervals
      textInterval && clearInterval(textInterval)
      // TODO: POST to recording#create to save the video

      // xhr.setRequestHeader('Content-Type', 'application/json');
      // xhr.send(JSON.stringify({
      //   value: value
      // }));
      // location.href = "/recording/1/edit"

    } else {
      isRecording = !isRecording;

      streamObj.then(() => startRecording(live.captureStream()))
        .then(recordedChunks => {
          const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          console.log("Stopping recording of video stream!");
          saveFile(recordedBlob);
          // var bbUrl = URL.createObjectURL(recordedBlob);
          // sessionStorage.setItem("derp",bbUrl);
        })
      
      var startTime = dayjs('2018-04-04T16:00:00.000Z')
      var count = 1;
      const text = document.getElementById('transcription')
      text.innerHTML = `00:00:00,000 --> 00:00:10,000: \n`

      start.style.background = "#FF0000";
      start.textContent = "Stop"

      //Every 10 seconds, we take the transcription, add it somewhere, then clear the transcription
      textInterval = setInterval(() => {
        const text = document.getElementById('transcription')
        const startIntervalTime = startTime.add(count * 10,'second')
        count += 1;
        const endIntervalTime = startTime.add(count * 10,'second')
        //TODO: add to some other text stored somewhere
        // if (count > 1){
        //   fullTranscription += count + '\n' + text.innerHTML + '\n'
        // }
        text.innerHTML += `\n ${startIntervalTime.format('HH:mm:ss,SSS')} --> ${endIntervalTime.format('HH:mm:ss,SSS')}: \n`
        text.scrollTop = text.scrollHeight
      }, (10000));
    }
  }

  

  const saveFile = (blob) => {
    console.log("SAVING");
    console.log(blob);
    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
      var base64data = reader.result;
      const payload = JSON.stringify({'video_file': base64data})
      var fd = new FormData();
      fd.append('recording', payload);
      jQuery.ajax({
        type: 'POST',
        url: '/recording',
        data: fd,
        dataType:'json',
        processData: false,
        contentType: false,
        success: function(data, textStatus) {
          console.log(data)
          if (data.redirect) {
              // data.redirect contains the string URL to redirect to
              window.location.href = data.redirect;
          }
      }  
      })
    }
        
    // link.href = blobUrl;
    // link.download = "video.webm";
    //SAVE RECORDING
    // fetch('http://localhost:3000/recording/',{
    //   method:"POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //   body:JSON.stringify({
    //     id:1,
    //     video_file: blob,
    //     title:'test'
    //     })
    //   })
  }

  start.addEventListener("click", btnOnClick);
  
  var streamObj = startVideo();
  var link = document.createElement("a");
}

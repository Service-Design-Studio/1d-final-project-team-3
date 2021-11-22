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
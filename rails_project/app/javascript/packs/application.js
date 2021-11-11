// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@rails/ujs").start()
// require("turbolinks").start()
// require("@rails/activestorage").start()
// require("channels")
// require("jquery")
// require("camera/webcam")


import Rails from "@rails/ujs";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import {initRecordVideo, initSaveVideo} from "../Recording/index";
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .
window.onload = () => initRecordVideo();
$('tr').click(function() {
    alert("table row clicked")
    //window.document.location = $(this).data("link")
    windows.location.href = edit_recording_path(record)
  });

// window.onload = () => initSaveVideo();
// window.onbeforeunload = () => RecordVideo().stopVideo;

Rails.start();
ActiveStorage.start();

// document.addEventListener('turbolinks:load', () => {
//     if(document.querySelector("#live")) {
//       initRecordVideo();
//     }
//   });


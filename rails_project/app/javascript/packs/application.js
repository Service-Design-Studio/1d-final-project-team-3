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
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .

Rails.start();
ActiveStorage.start();
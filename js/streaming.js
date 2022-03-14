'use strict';


const videoInput = document.getElementById('videoInput');
const audioInput = document.getElementById('audioInput');

const camVideo = document.getElementById('video');
const hideButton = document.getElementById("hideVideo");
const screenVideo = document.getElementById('shareScreenVideo');
const hideScreenButton = document.getElementById('hideScreenButton');

navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(setStream).then(gotDevices);

videoInput.onchange = inputChange;
audioInput.onchange = inputChange;

function setStream(stream) {
  window.stream = stream;
  camVideo.srcObject = stream;
  
  return navigator.mediaDevices.enumerateDevices();
}

function setAudioInput(input) {
  audioInput.srcObject = input;
}

function gotDevices(deviceInfos) {

  const currentVideoinput = videoInput.value;
  const currentAudioinput = audioInput.value;

  while(videoInput.firstChild) {
    videoInput.removeChild(videoInput.firstChild);
  }
  while(audioInput.firstChild) {
    audioInput.removeChild(audioInput.firstChild);
  }

  for(let i = 0; i < deviceInfos.length; i++) {
    var option = document.createElement('option');

    if (deviceInfos[i].deviceId == currentVideoinput) {
      console.log("currentVideoinput: " + currentVideoinput)
      option.value = currentVideoinput;
      option.text = deviceInfos[i].label || "cam " + i;
      videoInput.appendChild(option);

    }
    if (deviceInfos[i].deviceId == currentAudioinput) {
      console.log("currentAudioinput: " + currentAudioinput)
      option.value = currentAudioinput;
      option.text = deviceInfos[i].label || "input " + i;
      audioInput.appendChild(option);

    }
  }

  for(let i = 0; i < deviceInfos.length; i++) {
    if( deviceInfos[i].deviceId !== currentVideoinput && deviceInfos[i].deviceId !== currentAudioinput ) {
      var option = document.createElement('option');

      console.log(deviceInfos[i]);
      
      if( "videoinput" == deviceInfos[i].kind ) {
        option.value = deviceInfos[i].deviceId;
        option.text = deviceInfos[i].label || "cam " + i;
        videoInput.appendChild(option);
      }
      else if( "audioinput" == deviceInfos[i].kind ) {
        option.value = deviceInfos[i].deviceId;
        option.text = deviceInfos[i].label || "input " + i;
        audioInput.appendChild(option);
      }
    }
  }
}
 
function inputChange() {
  console.log("input change");
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioInput.value;
  const videoSource = videoInput.value;
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(setStream).then(gotDevices);
}

function hideVideo() {
  if( true == camVideo.hidden ) {
    camVideo.hidden = false;
    hideButton.textContent = "hide";
  }
  else {
    camVideo.hidden = true;
    hideButton.textContent = "show";
  }
}

function startScreenshare() {
  const options = { video: { cursor: "always" }, audio: true };
  navigator.mediaDevices.getDisplayMedia(options).then(setScreenStream);
}

function setScreenStream(stream) {
  screenVideo.srcObject = stream;
}

function hideScreenShare() {
  if( true == screenVideo.hidden ) {
    screenVideo.hidden = false;
    hideScreenButton.textContent = "hide";
  }
  else {
    screenVideo.hidden = true;
    hideScreenButton.textContent = "show";
  }
}
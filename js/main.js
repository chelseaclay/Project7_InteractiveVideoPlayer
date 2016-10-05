// ****************************
// Video player controls
// ****************************

//Check to see if browser supports video
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {

  //Set variables to access controls
  var video = document.getElementById('video');
  var videoControls = document.getElementById('videoControls');

  // Hide the default controls
  video.controls = false;

  // Display custom video controls
  videoControls.style.display = 'block';


  //Set variables to access control buttons
  var playPause = document.getElementById('playPauseBtn');
  var currentTimeText = document.getElementById('currentTimeText');
  var durationTimeText = document.getElementById('durationTimeText');
  var playbackBtn = document.getElementById('playbackBtn');
  var $playbackSpeed = $("#playbackSpeed");
  var $playbackSpeedSelected = $("#playbackSpeed>p.selected");
  var muteBtn = document.getElementById('muteBtn');
  var volumeBar = document.getElementById('volumeBar');
  var progressBar = document.getElementById('progressBar');
  var progressbar = document.getElementById('progress-bar');
  var bufferBar = document.getElementById('bufferBar');
  var closedCaptioning = document.getElementById('closedCaptioning');
  var fullscreenBtn = document.getElementById('fullscreenBtn');

  //Set up play/pause button
  playPause.addEventListener('click', function(e) {
   if (video.paused || video.ended) {
     video.play();
     playPause.innerHTML = '<img src="icons/pause-icon.png" alt="Pause" />';
   } else {
     video.pause();
     playPause.innerHTML = '<img src="icons/play-icon.png" alt="Play" />';
   }
  });

  //Video time display
  video.addEventListener("timeupdate", seektimeupdate, false);

  function seektimeupdate() {
    var nt = video.currentTime * (100 / video.duration);
    progressBar.value = nt;
    var curmins = Math.floor(video.currentTime / 60);
    var cursecs = Math.floor(video.currentTime - curmins * 60);
    var durmins = Math.floor(video.duration / 60);
    var dursecs = Math.floor(video.duration - durmins * 60);
      if(cursecs < 10){
        cursecs = "0" + cursecs;
      }
      if(dursecs < 10){
        dursecs = "0" + dursecs;
      }
      if(curmins < 10){
        curmins = "0" + curmins;
      }
      if(durmins < 10){
        durmins = "0" + durmins;
      }
      currentTimeText.innerHTML = curmins + ":" + cursecs;
      durationTimeText.innerHTML = durmins + ":" + dursecs;
  }

  //Show/hide playback button on click
  playbackBtn.addEventListener("click", function(){
    $playbackSpeed.toggle();
  });

  //Playback speed button
  document.getElementById("speed15").addEventListener('click', function() {
    $playbackSpeedSelected.removeClass("selected");
		video.playbackRate = 1.5;
    document.getElementById("speed15").classList.add("selected");
    $playbackSpeed.hide();
	});

  document.getElementById("speed125").addEventListener('click', function() {
    $playbackSpeedSelected.removeClass("selected");
		video.playbackRate = 1.25;
    document.getElementById("speed125").classList.add("selected");
    $playbackSpeed.hide();
	});

  document.getElementById("speedN").addEventListener('click', function() {
    $playbackSpeedSelected.removeClass("selected");
		video.playbackRate = 1;
    document.getElementById("speedN").classList.add("selected");
    $playbackSpeed.hide();
	});

  document.getElementById("speed75").addEventListener('click', function() {
    $playbackSpeedSelected.removeClass("selected");
		video.playbackRate = 0.75;
    document.getElementById("speed75").classList.add("selected");
    $playbackSpeed.hide();
	});

  document.getElementById("speed5").addEventListener('click', function() {
    $playbackSpeedSelected.removeClass("selected");
		video.playbackRate = 0.5;
    document.getElementById("speed5").classList.add("selected");
    $playbackSpeed.hide();
	});

  //Set up mute button
  muteBtn.addEventListener('click', function(e) {
    if(video.muted = !video.muted) {
      muteBtn.innerHTML = '<img src="icons/volume-off-icon.png" alt="Mute" />';
    } else {
      muteBtn.innerHTML = '<img src="icons/volume-on-icon.png" alt="UnMute" />';
    }
  });

  //Set up volume button
  volumeBar.addEventListener("change", function() {
  // Update the video volume
  video.volume = volumeBar.value;
  });

  //Progress bar updates to video timing
  video.addEventListener('loadedmetadata', function() {
   progressbar.setAttribute('max', video.duration);
  });

  video.addEventListener('timeupdate', function() {
   progressBar.value = video.currentTime;
   progressbar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
  });

  video.addEventListener('timeupdate', function() {
   if (!progressBar.getAttribute('max')) {
     progressBar.setAttribute('max', video.duration);
     progressBar.value = video.currentTime;
     progressbar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
   }
  });

  //Buffering
  video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var value = (100 / video.duration) * video.currentTime;

		// calculate the buffer value;
		var bufferValue = (100 / video.duration) * video.buffered.end(0);

		// Update the slider and buffer value
		progressBar.value = value;
		bufferBar.value = bufferValue;
  });

  //Click progress bar to skip ahead
  progressBar.addEventListener('click', function(e) {
   var percent = e.offsetX / this.offsetWidth;
   video.currentTime = percent * video.duration;
   progressBar.value = percent / 100;
  });

  //Set up closed captioning button
  closedCaptioning.addEventListener('click', function() {
  		if (video.textTracks[0].mode == "showing") {
              	// Turn off captions and update button
              	video.textTracks[0].mode = "hidden";
                  closedCaptioning.innerHTML = '<img src="icons/closedCaptioning-off-icon.png" alt="Closed Captioning" />';
              } else {
              	// Turn captions on and update button
              	video.textTracks[0].mode = "showing";
                  closedCaptioning.innerHTML = '<img src="icons/closedCaptioning-on-icon.png" alt="Closed Captioning" />';
              }
          });

  //Click to go fullscreen
  fullscreenBtn.addEventListener("click", function(){
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  });
}



// ****************************
// Video transcript
// ****************************

// Container for the transcript
var transcript = document.getElementById("transcript");
// Put the captions together
var transcriptCaptions = [
  {
    start: 0.24,
    stop: 7.535,
    caption: "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."
  },
  {
    start: 7.536,
    stop: 13.96,
    caption: "Well there are many ways to connect to the internet, and most often people connect wirelessly."
  },
  {
    start:13.961 ,
    stop: 17.94,
    caption: "Let's look at an example of how you can connect to the internet."
  },
  {
    start: 17.941,
    stop: 30.92,
    caption: "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."
  },
  {
    start: 32.1,
    stop: 41.19,
    caption: "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."
  },
  {
    start: 42.35,
    stop: 53.76,
    caption: "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."
  },
  {
    start: 53.761,
    stop: 57.78,
    caption: "A modem is what connects the internet to your network at home."
  },
  {
    start: 57.781,
    stop: 59,
    caption: "A few common residential modems are DSL or..."
  }
];

// Put all the captions together and place in transcript container on page
function buildTranscript(){
  //variable to put each sentence of the caption in
  var createSpan;
  //Loop through all the captions in the transcriptCaptions array
  for(var i = 0; i < transcriptCaptions.length; i++) {
    //Span for each section of the caption
    createSpan = document.createElement("span");
    //Set start time as attribute of span
    createSpan.setAttribute('id', transcriptCaptions[i].start);
    //Get the caption tect from the transcriptCaptions array
    createSpan.innerHTML = transcriptCaptions[i].caption + " ";
    //Put each span element within the transcript are of the document
    transcript.appendChild(createSpan);
    //Add event listener for when span is clicked
    createSpan.addEventListener("click", playCaption);

    var spanElement = document.getElementById(transcriptCaptions[i].start);
    spanElement.removeAttribute("class", "highlight");
    if (video.currentTime >= transcriptCaptions[i].start && video.currentTime <= transcriptCaptions[i].stop) {
      spanElement.setAttribute("class",'highlight');
    }
  }
}

buildTranscript();

//Jump to spot in video when caption is clicked
function playCaption(event) {
  video.currentTime = event.target.id;
}

//Hightlight captions
video.addEventListener("timeupdate", function() {
  for(var i = 0; i < transcriptCaptions.length; i++){
    document.getElementById(transcriptCaptions[i].start).classList.remove('highlight');
    if (video.currentTime >= transcriptCaptions[i].start && video.currentTime <= transcriptCaptions[i].stop) {
      document.getElementById(transcriptCaptions[i].start).classList.add('highlight');
    }
  }
});

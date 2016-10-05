// Container for the transcript
var transcript = document.getElementById("transcript");
// Put the captions together
var transcriptCaptions = [
  {
    start: .24,
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
]

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

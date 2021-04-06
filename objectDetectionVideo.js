let video;
let detector;
let detections = [];

// Add video file
let fileName = "images/Surfing_Scheveningen.mp4"

// Create setup function
function setup() {

  // Create canvas
  createCanvas(1280, 720);

  // Add video
  video = createVideo(fileName, videoReady);
  video.size(1280, 720);

  // Hide the video and show only the canvas
  video.hide();
}

// Check if video is ready
function videoReady() {

  //play video and set volume to 0
  video.loop();
  video.volume(0);

  // Use model cocossd
  detector = ml5.objectDetector('cocossd', modelReady);
}

// Get the detections
function gotDetections(error, results) {

  // Loop through errors
  if (error) {
    console.error(error);
  }

  // Get the detections
  detections = results;

  // detect in the video
  detector.detect(video, gotDetections);
}


function modelReady() {
  detector.detect(video, gotDetections);
  console.log("ready")
  document.getElementById("loading").style.display = "none";
  document.getElementById("defaultCanvas0").style.display = "block";
}

// draw the rectangles
function draw() {

  // Build video
  image(video, 0, 0);

  // loop through detections
  for (let i = 0; i < detections.length; i += 1) {

    // Log detection
    console.log(detections[i])

    //remove the stroke
    noStroke();

    //Get the opacity based on
    opacity = 150*detections[i].confidence

    // log the percent
    // console.log(detections[i].confidence*100)

    // Create the color with the opacity
    fill(255, 0, 0,opacity);

    // Show the rectangle
    rect(detections[i].x - (detections[i].width*0.25) , detections[i].y - (detections[i].height*0.25), detections[i].width * 1.5, detections[i].height * 1.5);

  }
}

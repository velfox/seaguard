// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let video;
let detector;
let detections = [];

function setup() {
  createCanvas(1024, 768);
  video = createCapture(VIDEO, videoReady);
  video.size(1024, 768);
  video.hide();
}

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i += 1) {
    console.log(detections[i])
    if((detections[i].label == "person")&&(detections[i].height <= 400)){

      noStroke();
      fill(0, 255, 0);

      opacity = 150*detections[i].confidence
      console.log(detections[i].confidence*100)
      fill(255, 0, 0,opacity);

      rect(detections[i].x, detections[i].y, detections[i].width, detections[i].height);

    }
  }
}

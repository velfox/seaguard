// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let objectDetector;
let img;

var fileName = "images/sea_swimmers.jpg"

fileSize = getImageWidth(fileName)
function preload() {
  img = loadImage(fileName);
  // Models available are 'cocossd', 'yolo'
  objectDetector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(fileSize['width'], fileSize['height']);
  image(img, 0, 0);
  objectDetector.detect(img, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }

  for (let i = 0; i < results.length; i += 1) {
    console.log(results[i])
    if(results[i].label == "person"){
      noStroke();
      fill(0, 255, 0);
      // text(
      //   `${results[i].label} ${nfc(results[i].confidence * 100.0, 2)}%`,
      //   results[i].x + 5,
      //   results[i].y + 15,
      // );

      opacity = 150*results[i].confidence
      console.log(results[i].confidence*100)
      fill(255, 0, 0,opacity);
      // strokeWeight(2);
      // console.log(color);
      // stroke(255, 0, 0);
      rect(results[i].x, results[i].y, results[i].width, results[i].height);
      // globalAlpha = 0.2;
    }
  }
}

function getImageWidth(fileName){
  const img = new Image();

  var imageSize = {}
  img.onload = function() {
    imageSize['width'] = this.width
    imageSize['height'] = this.height
  }
  img.src = fileName;

  return imageSize
}

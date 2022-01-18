let myImage;
let originalImage;

function preload() {
  originalImage = loadImage('GA.jpg');
  myImage = loadImage('GA.jpg');
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);
  // scales the image down for speed. Adjust at your own risk.   
  if(myImage.width>myImage.height) {
    originalImage.resize(width*0.5,0); 
    myImage.resize(width*0.5,0); 
  } else {
    originalImage.resize(0,height*0.5);
    myImage.resize(0,height*0.5);
  }
  
}

function draw() {
  image(myImage,width/2-myImage.width/2, height/2-myImage.height/2);
  noLoop();
}

const manipulationDispatch = {
  "i": invertColors,
  "d": desaturate,
  "r": resetImage,
  "h": flipImageH,
  "j": infared,
  "g": greenFilter,
  "b": blueFilter,
  "e": pixeldensity
}

function keyPressed() {
  if( key in manipulationDispatch ) {
    myImage.loadPixels();
    manipulationDispatch[key]();
    myImage.updatePixels();
    redraw();
  }
}

function resetImage() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(x,y));
    }
  }
}

function flipImageH() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(myImage.width-x,y));
    }
  }
}

function desaturate() {
  const desaturateAmount = 0.8;
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {   
      let originalPixel = myImage.get(x,y);
      const r = red(originalPixel);
      const g = green(originalPixel);
      const b = blue(originalPixel);
      const LUMA = (Math.min(r,g,b) + Math.max(r,g,b))/2
      myImage.set(x,y, color(
        r + desaturateAmount * (LUMA-r),
        g + desaturateAmount * (LUMA-g),
        b + desaturateAmount * (LUMA-b)
      ));
    }
  }
}

function invertColors() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        255-red(originalPixel),
        255-green(originalPixel),
        255-blue(originalPixel)
      ));
    }
  }
}

function infared() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        red(originalPixel),
        0,
        0,
      ));
    }
  }
}

function greenFilter() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        0,
        green(originalPixel),
        0
      ));
    }
  }
}
function blueFilter() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) { 
      let originalPixel = myImage.get(x,y);
      myImage.set( x, y, color(
        0,
        0,
        blue(originalPixel)
      ));
    }
  }
}
function filterexperimental() {
  for( let x = 0; x < myImage.width; x++ ) {
    for( let y = 0; y < myImage.height; y++ ) {
      myImage.set(x,y,originalImage.get(myImage.width-x,y));
    }
  }
}
function pixeldensity() {
  pixelDensity(0.15);
}
let x;
let y;
let diam = 250;
let circle2;
let max = 15;

let circles = [];
let dots = [];
let orbits = [];
let overlap = false;
let yPadding = 250;
let xPadding = 200;
let tempX;
let tempY;

function setup() {
  createCanvas(800, 800);

  colorMode(HSB);
  background(197, 100, 46);

  for (i = 0; i < max; i++) {
    y = (25 + yPadding) * i;

    for (j = 0; j < 6; j++) {
      y += +50;
      x = (60 + xPadding) * j + random(-10, 10);
      //SET DIAMETER AND RANDOM INNER CIRCLE DIAMETER

      circle2 = diam - random(90, 150);

      let circle = new Circle(x, y, diam, circle2);

      circles.push(circle);

      let dot = new Dot(x, y, diam, circle2);

      dots.push(dot);

      let orbit = new Orbit(x, y);

      orbits.push(orbit);
    }
  }

  for (j = 0; j < circles.length; j++) {
    circles[j].draw();
    
    dots[j].draw();

    
  }
}

function draw() {

  for (i = 0; i < circles.length; i++) {
    

  }

  for (j = 0; j < circles.length; j++) {
   
    orbits[j].update();
    circles[j].draw();
    dots[j].draw();
    orbits[j].draw();

  }
}


class Circle {
  constructor(x, y, d, c2) {
    noStroke();
    this.color1 = color(random(360), 85, 75);
    this.color2 = color(random(360), 85, 75);
    this.color3 = color(random(360), 85, 75);
    this.color4 = color(random(360), 85, 75);

    this.stroke = color(random(360), 85, 75);

    this.xPos = x;
    this.yPos = y;
    this.diam = d;

    this.circle2 = c2;

    this.circle3 = this.circle2 - random(20, 40);

    this.circle4 = this.circle3 - random(20, 40);
  }

  draw() {
    noStroke();
    fill(this.color1);
    ellipse(this.xPos, this.yPos, this.diam);

    stroke(this.stroke)
    stroke(3);

    fill(this.color2);
    ellipse(this.xPos, this.yPos, this.circle2);

    fill(this.color3);
    ellipse(this.xPos, this.yPos, this.circle3);

    fill(this.color4);
    ellipse(this.xPos, this.yPos, this.circle4);
  }
}

class Dot {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.min = min;
    this.color = color(random(360), 85, 30);

    this.noOfDots = 40;
    this.noOfLayers = (this.diam - this.min) / 37.5;
  }

  draw() {
    push();
    noStroke();
    fill(this.color);
    push();
    translate(this.x, this.y);
    let size = 15;

    for (let j = 0; j < this.noOfLayers; j++) {
      for (let i = 0; i < this.noOfDots; i++) {
        ellipse(this.min / 2 + size / 2 + j * size, 0, size);
        rotate(i * this.noOfDots);
      }
    }

    pop();
  }
}

class Orbit {
  constructor(x, y) {
    this.orbitX = x;
    this.orbitY = y;
    this.orbitRadius = 150
    this.speed = 0.1;
    this.angle = 0;
  }

  draw() {
    //translate(this.x, this, y);

    var x = this.orbitX + this.orbitRadius * cos(this.angle);
    var y = this.orbitY + this.orbitRadius * sin(this.angle);

    fill(random(160), 90, 60);
    stroke('#C04F25')
    strokeWeight(3)
    ellipse(x, y, random(5, 20));
  }

  update(){
    this.angle += this.speed;
  }
 }

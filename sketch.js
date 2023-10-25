let x;
let y;
let diam = 350;
let circle2;
let max = 15;

let circles = [];
let finishedCircles = [];
let overlap = false;
let yPadding = 300;
let xPadding = 250;
let tempX;
let tempY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  background(197, 100, 46);

  for (i = 0; i < max; i++) {
    y = (75 + yPadding) * i;

    for (j = 0; j < 6; j++) {
      y += +50;
      x = (150 + xPadding) * j + random(-40, 40);
      //SET DIAMETER AND RANDOM INNER CIRCLE DIAMETER

      circle2 = diam - random(150, 200);

      let circle = new Circle(x, y, diam, circle2);

      circles.push(circle);
    }
  }

  for (j = 0; j < circles.length; j++) {
    circles[j].draw();
    let dots = new Dots(
      circles[j].xPos,
      circles[j].yPos,
      circles[j].diam,
      circles[j].circle2
    );
    dots.draw();
  }
}

function draw() {}

class Circle {
  constructor(x, y, d, c2) {
    noStroke();
    this.color1 = color(random(360), 85, 75);
    this.color2 = color(random(360), 85, 75);
    this.color3 = color(random(360), 85, 75);
    this.color4 = color(random(360), 85, 75);

    this.xPos = x;
    this.yPos = y;
    this.diam = d;

    this.circle2 = c2;

    this.circle3 = this.circle2 - random(50, 75);

    this.circle4 = this.circle3 - random(20, 40);
  }

  draw() {
    fill(this.color1);
    ellipse(this.xPos, this.yPos, this.diam);

    fill(this.color2);
    ellipse(this.xPos, this.yPos, this.circle2);

    fill(this.color3);
    ellipse(this.xPos, this.yPos, this.circle3);

    fill(this.color4);
    ellipse(this.xPos, this.yPos, this.circle4);
  }
}

class Dots {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.min = min;

    this.noOfDots = 40;
    this.noOfLayers = (this.diam - this.min) / 50;
  }

  draw() {
    push();
    noStroke();
    fill(random(360), 85, 30);
    push();
    translate(this.x, this.y);
    let size = 20;

    for (let j = 0; j < this.noOfLayers; j++) {
      for (let i = 0; i < this.noOfDots; i++) {
        ellipse(this.min / 2 + size / 2 + j * size, 0, size);
        rotate(i * this.noOfDots);
      }
    }

    pop();
  }
}

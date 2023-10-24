let x;
let y;
let diam;
let circle2; 
let max = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  diam = random(250, 350)
  circle2 = diam - random(150, 200);
  colorMode(HSB);
  background(197, 100, 46);
  
  let circle = new Circle(x, y, diam, circle2);
  circle.draw();

  let dots = new Dots(x, y, diam, circle2);
  dots.draw();
 

}

function draw() {

  //ellipse(width/2, height/2, 50);

}

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
    this.min = min

    this.noOfDots = 40;
    this.noOfLayers = (this.diam - this.min) / 50;
  }

  draw() {
    noStroke();
    fill(random(360), 85, 30);
    push()
    translate(x, y);
    let size = 20;

  for (let j = 0; j < this.noOfLayers; j++) {
    for (let i = 0; i < this.noOfDots; i++) {
      
      ellipse((this.min/2 + size/2) + j * size, 0, size);
      rotate(i * this.noOfDots)
    }
  }
    
  }
}

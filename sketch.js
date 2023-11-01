let x;
let y;
let diam = 250;
let circle2;
let max = 15;

let circles = [];
let dots = [];
let stripes = [];
let orbits = [];
let overlap = false;
let yPadding = 250;
let xPadding = 200;
let tempX;
let tempY;

let type = 1;

let image;

let scaleFactor = 1;
let scale;

function setup() {
  //frameRate(30)
  createCanvas(800, 800);

  image = loadImage("assets/paint.png");

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

      type = random(1, 2)
      type = Math.round(type);

      if (type == 1) {
      let dot = new Dot(x, y, diam, circle2);
      dots.push(dot);

      //type -= 1;
      } else {
        let stripe = new Stripe(x, y, diam, circle2);
        stripes.push(stripe);
        //type+=1;
      }

      let orbit = new Orbit(x, y);

      orbits.push(orbit);

    }
  }

  for (j = 0; j < circles.length; j++) {
    circles[j].draw();

    //dots[j].draw();
  }
}

function draw() {
  for (h = 0; h < orbits.length; h++){
    orbits[h].update()
    orbits[h].draw()
  }
  background(197, 100, 46, 0.3);
  for (j = 0; j < circles.length; j++) {
    orbits[j].update();
    circles[j].draw();
    
    
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].draw();
    
  }

  for (k = 0; k < stripes.length; k++) {
    stripes[k].draw();
  }
}

class Circle {
  constructor(x, y, d, c2) {
    noStroke();
    this.color1 = color(random(360), 33, 100);
    this.color2 = color(random(360), 33, 180);
    this.color3 = color(random(360), 33, 180);
    this.color4 = color(random(360), 33, 180);

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

    stroke(this.stroke);
    strokeWeight(10);

    fill(this.color2);
    ellipse(this.xPos, this.yPos, this.circle2);

    fill(this.color3);
    ellipse(this.xPos, this.yPos, this.circle3);

    fill(this.color4);
    ellipse(this.xPos, this.yPos, this.circle4);
  }

  scale() {
    //scale(5)
    push()

    setInterval(this.grow(), 5000)

    setInterval(this.shrink(), 5000)
   
    console.log("scaled")
    pop()
  }

  grow() {
    scale = diam += 40
    this.diam = scale
    this.draw()
  }

  shrink() {
    scale = diam -= 40
    this.diam = scale
    this.draw()
  }

  startJitter() {
      setInterval(this.jitter(), 5000);
  }

  jitter() {
    this.xPos += random(-3, 3);
    this.draw
  }
  
}

class Dot {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.min = min;
    this.color = color(random(230), 85, 30);

    this.noOfDots = 40;
    this.noOfLayers = (this.diam - this.min) / 37.5;
  }

  draw() {
    push();
    noStroke();
    fill(this.color);
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

class Stripe {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.min = min;
    this.color = color(random(230), 85, 30);

    this.noOfLines = 80;
  }

  draw() {
    push()
    stroke(this.color);
    strokeWeight(5);

    translate(this.x, this.y)
      for (i = 0; i < this.noOfLines; i++) {
        line(this.min/2, 0, this.diam/2, 0)
        rotate( this.noOfLines);
      }

    pop();
  }

  scale() {
    //scale(5)
    push()

    setInterval(this.grow(), 1000)

    setInterval(this.shrink(), 1000)
   
    console.log("scaled")
    pop()
  }

  grow() {
    stripes.forEach(line => {
      scale = diam += 40
      this.diam = scale
      fill(random(360, 100, 100))
      this.draw()
    });
    
  }

  shrink() {
    stripes.forEach(line => {
      scale = diam -= 40
      this.diam = scale
      this.draw()
    });
  }
}

class Orbit {
  constructor(x, y) {
    this.orbitX = x;
    this.orbitY = y;
    this.orbitRadius = 150;
    this.speed = 0.1;
    this.angle = 0;
  }

  draw() {
    //translate(this.x, this, y);

    var x = this.orbitX + this.orbitRadius * cos(this.angle);
    var y = this.orbitY + this.orbitRadius * sin(this.angle);

    fill(random(160), 90, 60);
    stroke("#C04F25");
    strokeWeight(3);
    ellipse(x, y, random(5, 20));
  }

  update() {
    this.angle += this.speed;
  }
}

function mousePressed() {
  console.log("Mouse clicked");
  for (i = 0; i < circles.length; i++) {
    if (dist(mouseX, mouseY, circles[i].xPos, circles[i].yPos) <= diam/2) {
      console.log(i + " pressed")
      circles[i].scale()
      //circles[i].draw()
    }
  }

  for (i = 0; i < stripes.length; i++) {
    if (dist(mouseX, mouseY, stripes[i].x, stripes[i].y) <= diam/2) {
      console.log(i + " pressed")
      stripes[i].scale()
      //circles[i].draw()
    }
  }
}

function keyPressed() {
  if (key == "d") {
    circles.forEach(circle => {
      //circle.xPos += random(-3, 3);
      circle.startJitter();
     });
  }
}

function jitter() {
  
}

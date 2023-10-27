let x;
let y;
let diam = 350;
let circle2;
let max = 15;

let circles = [];
let dots = [];
let overlap = false;
let yPadding = 300;
let xPadding = 250;
let tempX;
let tempY;

let agents = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  background(197, 100, 46);

  for (let i = 0; i < width; i+=250){
    for (let j = 0; j < height; j+=250){
      agents.push(new Agent(i,j));
    }
  }5

  for (i = 0; i < max; i++) {
    y = (75 + yPadding) * i;

    for (j = 0; j < 6; j++) {
      y += +50;
      x = (150 + xPadding) * j + random(-40, 40);
      //SET DIAMETER AND RANDOM INNER CIRCLE DIAMETER

      circle2 = diam - random(150, 200);

      let circle = new Circle(x, y, diam, circle2);

      circles.push(circle);

      let dot = new Dot(x, y, diam, circle2);

      dots.push(dot);
    }
  }

  for (j = 0; j < circles.length; j++) {
    circles[j].draw();
    
    dots[j].draw();
  }
}

function draw() {
  updateAgents();
  sortAgentsBySize(agents);

  for (j = 0; j < circles.length; j++) {
    circles[j].draw();
    dots[j].draw();
  }
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

class Dot {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.min = min;
    this.color = color(random(360), 85, 30);

    this.noOfDots = 40;
    this.noOfLayers = (this.diam - this.min) / 50;
  }

  draw() {
    push();
    noStroke();
    fill(this.color);
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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
function sortAgentsBySize(array){
  for (var i = 0; i < array.length-1; i++){
    if (array[i].r < array[i+1].r){
      var temp = array[i];
      array[i] = array[i+1];
      array[i+1] = temp;
      //i = 0;
    }
  }
}


function updateAgents(){
  if(true){
    for (let i = 0; i < agents.length; i++){
      agents[i].update();
    }
  }else{
    for (let i = 0; i < agents.length/4; i++){
      agents[i].update();
    }

  }
}
class Agent{
  constructor(x, y){
    this.x = x; this.y = y; this.r = 20;
    this.xv = 10;
    this.yv = 10;
    this.first = true;
  }
  update(){
    translate(circle.xPos, 250)
    fill(random(360), 85, 55, );
    if(this.first){
      for(let i = 0; i < 50; i+=5){
        circle(this.x,this.y,i);
      }
      noFill();stroke(0,10);circle(this.x,this.y,100);noStroke();
      this.first = false;
    }
    else{
      
      circle(this.x,this.y,this.r);
      this.x+=random(-this.xv,this.xv);this.y+=random(-this.yv,this.yv);
      this.xv+=random(-.1,.1);
      this.yv+=random(-.1, .1)
      this.r+=random(-.1,.1);
    
      if (this.x > width)this.x = width; if (this.x <= 0)this.x = 0;
      if (this.y > height)this.y = height; if (this.y <=0)this.y = 0;
    }
  }

}

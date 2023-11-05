let x;
let y;
let diam = 250;
let circle2;
let max = 15;
let circlesX = 15;

let circles = [];
let dots = [];
let stripes = [];
let orbits = [];
let overlap = false;
let yPadding = 200;
let xPadding = 250;
let tempX;
let tempY;

let type = 1;

let circleClicked = false; //boolean is circle clicked
let currentCircle; //values of position in array, X, Y pos
let currentCircleX;
let currentCircleY;

let dotClicked = false; //boolean is dots clicked
let currentDot; //values of position in array, X, Y pos
let currentDotX;
let currentDotY;

let stripeClicked = false; //boolean is stripes clicked
let currentStripe; //values of position in array, X, Y pos
let currentStripeX;
let currentStripeY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //FIND THE AMOUNT OF CIRCLES NEEDED TO FILL WINDOW
  circlesX = Math.round(width / diam);

  console.log(circlesX);

  colorMode(HSB);
  background(220, 26, 100);

  //CREATE CIRCLES UNTIL IT REACHES WITH AND START NEW LAYER
  for (i = 0; i < max; i++) {
    y = (100 + yPadding) * i;

    for (j = 0; j < circlesX; j++) {
      //INCREASES THE Y POSITION OF EACH CIRCLE IN LAYER DEPENDENT OF WINDOW WIDTH
      y += width / (circlesX * 10);
      x = (60 + xPadding) * j + random(-10, 10);
      //SET DIAMETER AND RANDOM INNER CIRCLE DIAMETER

      //INNER CIRCLE DIAM
      circle2 = diam - random(90, 150);

      let circle = new Circle(x, y, diam, circle2);

      //ADD NEW CIRCLE TO ARRAY
      circles.push(circle);

      type = random(1, 2);
      type = Math.round(type);

      //SWITCH RANDOMLY BETWEEN DOTS AND STRIPES
      if (type == 1) {
        let dot = new Dot(x, y, diam, circle2);
        dots.push(dot);
      } else {
        let stripe = new Stripe(x, y, diam, circle2);
        stripes.push(stripe);
      }

      //CREATE ORBIT FOR EACH CIRCLE
      let orbit = new Orbit(x, y);

      orbits.push(orbit);

    }
  }
}

function draw() {
  //draw each orbit
  for (h = 0; h < orbits.length; h++){
    orbits[h].update()
    orbits[h].draw()
  }
  background(220, 26, 100, 0.05);

  //draw each circle
  for (j = 0; j < circles.length; j++) {
    orbits[j].update();
    circles[j].draw();

    orbits[j].draw();
  }

//draw each dots
  dots.forEach(dot => {
    dot.draw();
  });

//draw each stripes
  stripes.forEach(stripe => {
    stripe.draw();
  });
    
//if key is pressed
  if (keyIsPressed) {
    //if d is pressed jitter each circle and dots or stripes
    if (key == 'd') {
      circles.forEach(circle => {
      let value = random(-2, 2);

        orbits.forEach(orbit => {
          orbit.jitter(value)
        }); 
        stripes.forEach(stripe => {
          if (stripe.x == circle.xPos) {
            stripe.jitter(value);
          }
        });
        dots.forEach(dot => {
          if (dot.x == circle.xPos) {
            dot.jitter(value);
          }
        });
        circle.jitter(value);
      });   
    }
  }
}

//CIRCLE OBJECT
class Circle {
  constructor(x, y, d, c2) {
    noStroke();
    this.color1 = color(random(20, 34), random(40), 100); // 大圆
    this.color2 = color(324, random(0, 68), 100); // 内圈 light pink
    this.color3 = color(7, 58, 48); // 内圈  dark
    this.color4 = color(random(243), 24, 100); //中心

    this.stroke = color(342, 92, 97);

    this.xPos = x;
    this.yPos = y;
    this.diam = d;

    //EACH ADDITIONAL CIRCLE WITHIN THE MAIN CIRCLE
    this.circle2 = c2;

    this.circle3 = this.circle2 - random(40, 60);

    this.circle4 = this.circle3 - random(20, 50);

    this.size= 40;
    this.grown = false;
  }

  draw() {
    stroke(292, 33, 88);
    strokeWeight(3);
    fill(this.color1);
    ellipse(this.xPos, this.yPos, this.diam);

    stroke(this.stroke);
    strokeWeight(3);

    fill(this.color2);
    ellipse(this.xPos, this.yPos, this.circle2);

    fill(this.color3);
    ellipse(this.xPos, this.yPos, this.circle3);

    fill(this.color4);
    ellipse(this.xPos, this.yPos, this.circle4);
  }

  scale() {
    push()

    //if not grown grow circle, otherwise shrink circle
    if(this.grown == false) {
      this.grow();
    } else {
      this.shrink()
    }
    //setInterval(this.shrink(), 5000)
   
    console.log("scaled")
    pop()
  }

  grow() {
    this.diam += this.size
    this.circle2 += this.size
    this.draw()

    this.grown = true;
  }

  shrink() {
    this.diam -= this.size;
    this.circle2 -= this.size
    this.draw()

    this.grown = false;
  }

  jitter(num) {
    this.xPos += num;
  }
  
}


//DOTS OBJECT
class Dot {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;

    this.diam = diam;
    this.min = min;
    this.color = color(random(50), 83, 100);

    this.noOfDots = 50;
    this.noOfLayers = (this.diam - this.min) / 30;

    this.size = 120;
    this.grown = false;
  }

  draw() {
    push();
    noStroke();
    fill(this.color);
    translate(this.x, this.y);
    let size = 10;

    //USES DIAM AND INNER CIRCLE TO DETERMINE WHERE DOTS SHOULD BE
    //CREATES LAYERS OF DOTS ROTATE INCREMENTALLY
    for (let j = 0; j < this.noOfLayers; j++) {
      for (let i = 0; i < this.noOfDots; i++) {
        ellipse(this.min / 1.7 + size / 3 + j * size, 0, size);
        rotate(i * this.noOfDots);
      }
    }
    pop();
  }

  scale() {
    if (this.grown == false) {
      this.grow()
    } else {
      this.shrink();
    }
  }

  grow() {
    this.diam += this.size;
    this.noOfLayers = (this.diam - this.min) / 30;
    this.draw();
    this.grown = true;
  }

  shrink() {
    this.diam -= this.size;
    this.noOfLayers = (this.diam - this.min) / 30;
    this.draw();
    this.grown = false;
  }

  jitter(num) {
    this.x += num;
  }
}

//STRIPES OBJECT
class Stripe {
  constructor(x, y, diam, min) {
    this.x = x;
    this.y = y;
    this.diam = diam;
    this.min = min;
    this.color = color(random(230), 85, 50);

    this.noOfLines = 80;

    this.size = 40;
    this.grown = false;
  }

  draw() {
    push();
    stroke(this.color);
    strokeWeight(3);

    //CREATES LINES AND RANDOMLY ROTATES
    translate(this.x, this.y);
    for (i = 0; i < this.noOfLines; i++) {
      line(this.min / 1.7, 0, this.diam / 2, 0);
      rotate(this.noOfLines);
    }

    pop();
  }

  scale() {

    if (this.grown == false) {
      this.grow();
    } else {
      this.shrink();
    }
   
  }

  grow() {
    
      this.diam *=1.5
      this.min += this.size;
      this.color = color(random(255), 85, 50)
      this.draw();
      this.grown = true;
  }

  shrink() {
      this.diam /= 1.5
      this.min -= this.size;
      this.draw()
      this.grown = false;
  }

  jitter(num) {
    this.x += num;
  }
}

//ORBIT OBJECTS
class Orbit {
  constructor(x, y) {
    this.orbitX = x;
    this.orbitY = y;
    this.orbitRadius = 170;
    this.speed = 0.1;
    this.angle = 0;
  }

  draw() {
    //MOVES USING COSINE AND SINE WAVES ORBITTING AROUND CIRCLES
    var x = this.orbitX + this.orbitRadius * cos(this.angle);
    var y = this.orbitY + this.orbitRadius * sin(this.angle);

    fill(random(70), 40, 100);
    stroke(10, 250, 250);
    ellipse(x, y, random(2, 10));
  }

  update() {
    this.angle += this.speed;
  }

  jitter(value) {
    this.orbitX += value;
    this.draw();
  }
}

function mouseDragged() {
  for (i = 0; i < circles.length; i++) {
    //check which circle is clicked on
    if (dist(mouseX, mouseY, circles[i].xPos, circles[i].yPos) <= diam/2) {

      if (circleClicked == false) {
        //store original position of circle
        currentCircleX = circles[i].xPos;
        currentCircleY = circles[i].yPos;
        currentCircle = i;
        circleClicked = true;
      }
      
      //move the circle around with mouse constrained to small area
      circles[i].xPos = constrain(mouseX, currentCircleX-50, currentCircleX+50);
      circles[i].yPos = constrain(mouseY, currentCircleY-50, currentCircleY+50);  

      //check if the circle has stripes and moves with circle
      stripes.forEach(stripe => {
        if (dist(mouseX, mouseY, stripe.x, stripe.y) <= diam/2) {
          if (stripeClicked == false) {
            currentStripeX = stripe.x;
            currentStripeY = stripe.y;
            currentStripe = stripe;
            stripeClicked = true;
          }

          stripe.x = constrain(mouseX, currentCircleX-50, currentCircleX+50);
          stripe.y = constrain(mouseY, currentCircleY-50, currentCircleY+50);  
        }
      });

      //check if the circle has dots and move with circle
      dots.forEach(dot => {
        if (dist(mouseX, mouseY, dot.x, dot.y) <= diam/2) {
          if (dotClicked == false) {
            currentDotX = dot.x;
            currentDotY = dot.y;
            currentDot = dot;
            dotClicked = true;
          }

          dot.x = constrain(mouseX, currentCircleX-50, currentCircleX+50);
          dot.y = constrain(mouseY, currentCircleY-50, currentCircleY+50);  
        }
      });
    }
  }

  
}

function mouseReleased() {
  //once mouse is released return circle to original position
  circleClicked = false;
  dotClicked = false;
  stripeClicked = false;
  
  circles[currentCircle].xPos = currentCircleX;
  circles[currentCircle].yPos = currentCircleY;

  if (currentDot != null) {
    currentDot.x = currentDotX;
    currentDot.y = currentDotY;
  }

  if (currentStripe != null) {
    currentStripe.x = currentStripeX;
    currentStripe.y = currentStripeY;
  }
}

function keyPressed() {
  //if w is pressed check for mouse position on circle
  if (key == 'w') {
    for (i = 0; i < circles.length; i++) {
      if (dist(mouseX, mouseY, circles[i].xPos, circles[i].yPos) <= diam/2) {
        //if mouse over circle scale
        circles[i].scale()
      }
    }
  
    for (i = 0; i < stripes.length; i++) {
      if (dist(mouseX, mouseY, stripes[i].x, stripes[i].y) <= diam/2) {
        //if mouse over circle w/ stripes scale stripes
        stripes[i].scale();
      }
    }
  
    for (i = 0; i < dots.length; i++) {
      if (dist(mouseX, mouseY, dots[i].x, dots[i].y) <= diam/2) {
        //if mouse over circle w/ dots scale dots
        dots[i].scale();
      }
    }
  }
}

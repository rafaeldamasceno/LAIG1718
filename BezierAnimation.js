function BezierAnimation(graph, animationSpeed, ctrlPoints) {
  Animation.call(this, graph);

  this.animationSpeed = animationSpeed;
  this.ctrlPoints = ctrlPoints;

  this.animationTime = 1000;

  this.p1 = ctrlPoints[0];
  this.p2 = ctrlPoints[1];
  this.p3 = ctrlPoints[2];
  this.p4 = ctrlPoints[3];

  this.length = this.getLength();

  this.animationTime = this.length/this.animationSpeed;

};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

BezierAnimation.prototype.getTransMatrix = function (elapsedTime) {
  console.log("here");
  let t = (elapsedTime / 1000) / this.animationTime;
  

  let x = Math.pow(1 - t, 3) * this.p1[0] 
    + 3 * t * Math.pow(1 - t, 2) * this.p2[0]
    + 3 * t * t * (1 - t) * this.p3[0]
    + t * t * t * this.p4[0];
  let y = Math.pow(1 - t, 3) * this.p1[1] 
    + 3 * t * Math.pow(1 - t, 2) * this.p2[1]
    + 3 * t * t * (1 - t) * this.p3[1]
    + t * t * t * this.p4[1];
  let z = Math.pow(1 - t, 3) * this.p1[2] 
    + 3 * t * Math.pow(1 - t, 2) * this.p2[2]
    + 3 * t * t * (1 - t) * this.p3[2]
    + t * t * t * this.p4[2];

  var dx, dy, dz;
  
  dx = 3 * this.p4[0] * t * t
    - 3 * this.p3[0] * t * t
    + 6 * this.p3[0] * (1 - t) * t
    - 6 * this.p2[0] * (1 - t) * t
    + 3 * this.p2[0] * Math.pow(1 - t, 2)
    - 3 * this.p1[0] * Math.pow(1 - t, 2);
  dy = 3 * this.p4[1] * t * t
    - 3 * this.p3[1] * t * t
    + 6 * this.p3[1] * (1 - t) * t
    - 6 * this.p2[1] * (1 - t) * t
    + 3 * this.p2[1] * Math.pow(1 - t, 2)
    - 3 * this.p1[1] * Math.pow(1 - t, 2);
  dz = 3 * this.p4[2] * t * t
    - 3 * this.p3[2] * t * t
    + 6 * this.p3[2] * (1 - t) * t
    - 6 * this.p2[2] * (1 - t) * t
    + 3 * this.p2[2] * Math.pow(1 - t, 2)
    - 3 * this.p1[2] * Math.pow(1 - t, 2);

  let coords = [x, y, z];
  let transMatrix = mat4.create();
  mat4.identity(transMatrix);
  mat4.translate(transMatrix, transMatrix, coords);


  return transMatrix;

}

BezierAnimation.prototype.getLength = function() {
  let p12 = [(this.p1[0] + this.p2[0])/2, (this.p1[1] + this.p2[1])/2, (this.p1[2] + this.p2[2])/2];
  let p23 = [(this.p2[0] + this.p3[0])/2, (this.p2[1] + this.p3[1])/2, (this.p2[2] + this.p3[2])/2];
  let p34 = [(this.p3[0] + this.p4[0])/2, (this.p3[1] + this.p4[1])/2, (this.p3[2] + this.p4[2])/2];

  let p123 = [(p12[0] + p23[0])/2, (p12[1] + p23[1])/2, (p12[2] + p23[2])/2];
  let p234 = [(p23[0] + p34[0])/2, (p23[1] + p34[1])/2, (p23[2] + p34[2])/2];

  let p1234 = [(p123[0] + p234[0])/2, (p123[1] + p234[1])/2, (p123[2] + p234[2])/2];

  let length = this.calcDist(this.p1, p12) + this.calcDist(p12, p123) + this.calcDist(p123, p1234) + this.calcDist(p1234, p234) + this.calcDist(p234, p34) + this.calcDist(p34, this.p4);

  return length;
}

BezierAnimation.prototype.calcDist = function (Point1, Point2) {
  return Math.sqrt(Math.pow(Point2[0] - Point1[0], 2) + Math.pow(Point2[1] - Point1[1], 2) + Math.pow(Point2[2] - Point1[2], 2))
}

BezierAnimation.prototype.getAnimationTime = function () {
  return this.animationTime * 1000;
}


function CircularAnimation(graph, animationSpeed, centerx, centery, centerz, radius, startang, rotang) {
  Animation.call(this, graph);

  this.animationSpeed = animationSpeed;
  this.centerx = centerx;
  this.centery = centery;
  this.centerz = centerz;
  this.radius = radius;
  this.startang = startang;
  this.rotang = rotang;
  this.animationTime = (rotang*radius*Math.PI/180)/animationSpeed * 1000;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.getTransMatrix = function (elapsedTime) {
  console.log(elapsedTime);
  let angrad = (this.startang * Math.PI/180) + (this.animationSpeed/this.radius)*(elapsedTime/1000);
  console.log(angrad);

  let coords = [this.centerx, this.centery, this.centerz];
  console.log(this.centerx);
  coords[0] += Math.cos(angrad)*this.radius;
  coords[2] += Math.sin(angrad)*this.radius;

  let transMatrix = mat4.create();
  mat4.identity(transMatrix);
  mat4.translate(transMatrix, transMatrix, coords);
  mat4.rotate(transMatrix, transMatrix, -(Math.PI/2 + angrad), [0, 1, 0]);

  return transMatrix;

}

CircularAnimation.prototype.getAnimationTime = function () {
  return this.animationTime;
}

CircularAnimation.prototype.getType = function (){
  return "Circular";
}
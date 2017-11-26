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
  let angrad = (this.startang * Math.PI/180) + (this.animationSpeed/this.radius)*(elapsedTime/1000);

  let coords = [this.centerx, this.centery, this.centerz];
  coords[0] += Math.cos(angrad)*this.radius;
  coords[2] += Math.sin(angrad)*this.radius;

  let transMatrix = mat4.create();
  mat4.identity(transMatrix);
  mat4.translate(transMatrix, transMatrix, coords);
  mat4.rotate(transMatrix, transMatrix, -angrad, [0, 1, 0]);

  return transMatrix;

}

CircularAnimation.prototype.getAnimationTime = function () {
  return this.animationTime;
}
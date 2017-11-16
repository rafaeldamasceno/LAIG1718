function CircularAnimation(graph, animationSpeed, centerx, centery, centerz, radius, startang, rotang) {
  Animation.call(this, graph);

  this.animationSpeed = animationSpeed;
  this.centerx = centerx;
  this.centery = centery;
  this.centerz = centerz;
  this.radius = radius;
  this.startang = startang;
  this.rotang = rotang;
};

CircularAnimation.prototype = Object.create(Animation.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;
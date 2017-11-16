function BezierAnimation(graph, animationSpeed, ctrlPoints) {
  Animation.call(this, graph);

  this.animationSpeed = animationSpeed;
  this.ctrlPoints = ctrlPoints;
  

};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;


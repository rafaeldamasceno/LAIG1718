function ComboAnimation(graph, animationIds) {
  Animation.call(this, graph);

  this.graph = graph;
  this.animationIds = animationIds;

};

ComboAnimation.prototype.getTransMatrix = function (elapsedTime) {
    return null;
}

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;

ComboAnimation.prototype.getAnimationTime = function () {
  return this.animationTime;
}

ComboAnimation.prototype.getAnimationTime = function() {
  return 0;
}
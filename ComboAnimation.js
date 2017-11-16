function ComboAnimation(graph, animationIds) {
  Animation.call(this, graph);

  this.animationIds = animationIds;
  

};

ComboAnimation.prototype = Object.create(Animation.prototype);
ComboAnimation.prototype.constructor = ComboAnimation;
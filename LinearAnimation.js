function LinearAnimation(graph, animationSpeed, ctrlPoints) {
  Animation.call(this, graph);

  this.animationSpeed = animationSpeed;
  this.ctrlPoints = ctrlPoints;
  this.animationTime = 0;
  this.segsTimes = [0];

  for (let i = 0; i < ctrlPoints.length - 1; i++) {
    let distance = Math.sqrt(Math.pow(ctrlPoints[i + 1][0] - ctrlPoints[i][0], 2) +
      Math.pow(ctrlPoints[i + 1][1] - ctrlPoints[i][1], 2) +
      Math.pow(ctrlPoints[i + 1][2] - ctrlPoints[i][2], 2));
    this.animationTime += distance / this.animationSpeed * 1000;
    this.segsTimes.push(this.animationTime);
  }
};

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.getTransMatrix = function (elapsedTime) {
  let segElapsedTime;
  let segTime;
  let seg;

  for (let i = 1; i < this.segsTimes.length; i++) {
   
    if (elapsedTime < this.segsTimes[i]) {
      
      segTime = this.segsTimes[i] - this.segsTimes[i - 1];
      segElapsedTime = elapsedTime - this.segsTimes[i - 1];
      seg = i;
      break;
    }
  }
  
  let perTime = segElapsedTime / segTime;

  let segVector = [
    this.ctrlPoints[seg][0] - this.ctrlPoints[seg - 1][0],
    this.ctrlPoints[seg][1] - this.ctrlPoints[seg - 1][1],
    this.ctrlPoints[seg][2] - this.ctrlPoints[seg - 1][2]
  ];

  let coords = [0,0,0];
  
  coords[0] += this.ctrlPoints[seg - 1][0] + segVector[0] * perTime;
  coords[1] += this.ctrlPoints[seg - 1][1] + segVector[1] * perTime;
  coords[2] += this.ctrlPoints[seg - 1][2] + segVector[2] * perTime;

  let transMatrix = mat4.create();
  mat4.identity(transMatrix);
  mat4.translate(transMatrix, transMatrix, coords);
  mat4.rotate(transMatrix, transMatrix, Math.atan2(segVector[0], segVector[2]), [0, 1, 0]);

  return transMatrix;
}

LinearAnimation.prototype.getAnimationTime = function () {
  return this.animationTime;
}
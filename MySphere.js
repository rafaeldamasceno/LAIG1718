


function MySphere(graph, radius, partsRadius, partsVertex) {
  MyGraphLeaf.call(this, graph);
  this.radius = radius;
  this.partsRadius = partsRadius;
  this.partsVertex = partsVertex;
}

MySphere.prototype = Object.create(MyGraphLeaf.prototype);
MySphere.prototype.constructor = MySphere;

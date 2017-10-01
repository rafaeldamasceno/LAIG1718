


function MyCylinder(graph, height, bottomRadius, topRadius, slices, vertices) {
  MyGraphLeaf.call(this, graph);
  this.height = height;
  this.bottomRadius = bottomRadius;
  this.topRadius = topRadius;
  this.slices = slices;
  this.vertices = vertices;
}

MyCylinder.prototype = Object.create(MyGraphLeaf.prototype);
MyCylinder.prototype.constructor = MyCylinder;

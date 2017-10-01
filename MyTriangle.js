


function MyTriangle(graph, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
  MyGraphLeaf.call(this, graph);
  this.x1 = x1;
  this.y1 = y1;
  this.z1 = z1;
  this.x2 = x2;
  this.y2 = y2;
  this.z2 = z2;
  this.x3 = x3;
  this.y3 = y3;
  this.z3 = z3;
}

MyTriangle.prototype = Object.create(MyGraphLeaf.prototype);
MyTriangle.prototype.constructor = MyTriangle;

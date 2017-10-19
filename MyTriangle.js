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

  this.initBuffers();
}

MyTriangle.prototype = Object.create(MyGraphLeaf.prototype);
MyTriangle.prototype.constructor = MyTriangle;

MyTriangle.prototype.initBuffers = function () {
  this.vertices = [
    this.x1, this.y1, this.z1,
    this.x2, this.y2, this.z2,
    this.x3, this.y3, this.z3,
  ];

  this.indices = [
    0, 1, 2,
  ];

  var v1 = [this.x1 - this.x3, this.y1 - this.y3, this.z1 - this.z3];
  var v2 = [this.x2 - this.x1, this.y2 - this.y1, this.z2 - this.z1];
  var v3 = [this.x3 - this.x2, this.y3 - this.y2, this.z3 - this.z2];

  var a = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]);
  var b = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]);
  var c = Math.sqrt(v3[0] * v3[0] + v3[1] * v3[1] + v3[2] * v3[2]);

  var cos = (a * a - b * b + c * c) / (2 * a * c);

  var normal = [v1[1] * v2[2] - v1[2] * v2[1], -v1[0] * v2[2] + v1[2] * v2[0], v1[0] * v2[1] - v1[1] * v2[0]];

  this.normals = normal.concat(normal, normal);

  this.origTexCoords = [c - a * cos, a * Math.sqrt(1 - cos * cos), c];

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

MyTriangle.prototype.updateTexScaling = function (saf, taf) {
  this.texCoords = [
    this.origTexCoords[0] / saf,
    1 - this.origTexCoords[1] / taf,
    0,
    1,
    this.origTexCoords[2] / saf,
    1
  ];

  this.initGLBuffers();
}

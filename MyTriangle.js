


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

  var vector1 = [this.x2 - this.x1, this.y2 - this.y1, this.z2 - this.z1,];
  var vector2 = [this.x3 - this.x1, this.y3 - this.y1, this.z3 - this.z1,];
  var vector3 = [this.x3 - this.x2, this.y3 - this.y2, this.z3 - this.z2,];

  var vetn1 = [vector2[1]*vector1[2] - vector2[2]* vector1[1], vector2[2]*vector1[0] - vector2[0]* vector1[2], vector2[0]*vector1[1] - vector2[1]* vector1[0],];
  var vetn2 = [vector3[1]*vector1[2] - vector3[2]* vector1[1], vector3[2]*vector1[0] - vector3[0]* vector1[2], vector3[0]*vector1[1] - vector3[1]* vector1[0],];
  var vetn3 = [vector3[1]*vector2[2] - vector3[2]* vector2[1], vector3[2]*vector2[0] - vector3[0]* vector2[2], vector3[0]*vector2[1] - vector3[1]* vector2[0],];

  this.normals = vetn1.concat(vetn2, vetn3);

  this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};

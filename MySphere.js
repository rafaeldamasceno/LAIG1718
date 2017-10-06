


function MySphere(graph, radius, partsRadius, partsVertex) {
  MyGraphLeaf.call(this, graph);
  this.radius = radius;
  this.partsRadius = partsRadius;
  this.partsVertex = partsVertex;

  this.initBuffers();
}

MySphere.prototype = Object.create(MyGraphLeaf.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function() {
	// this.vertices = [];
 // 	this.normals = [];
 // 	this.texCoords = [];

 this.vertices = [
   0, 1, 0,
   1, 1, 0,
   1, 0, 0,
   0, 0, 0,
 ];

 this.indices = [
   2, 1, 0,
   1, 2, 3,
 ];

 this.normals = [
   0, 0, 1,
   0, 0, 1,
   0, 0, 1,
   0, 0, 1
 ];



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

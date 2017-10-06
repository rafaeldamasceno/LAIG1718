


function MyCylinder(graph, height, bottomRadius, topRadius, slices, vertices) {
  MyGraphLeaf.call(this, graph);
  this.height = height;
  this.bottomRadius = bottomRadius;
  this.topRadius = topRadius;
  this.slices = slices;
  this.stacks = vertices;

  this.initBuffers();
}

MyCylinder.prototype = Object.create(MyGraphLeaf.prototype);
MyCylinder.prototype.constructor = MyCylinder;


MyCylinder.prototype.initBuffers = function() {
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

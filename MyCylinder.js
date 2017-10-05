


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
	this.vertices = [];
 	this.normals = [];
 	this.texCoords = [];


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

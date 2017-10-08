


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
this.indices = [];
this.texCoords = [];

var radDif = this.bottomRadius - this.topRadius;
var sSize = Math.sin(Math.PI/this.slices)*this.bottomRadius*2;
var tSize = Math.sqrt(this.height*this.height + radDif*radDif)/this.stacks;

for(i = 0; i <= this.stacks; i++) {
  var r = this.bottomRadius - radDif*(i/this.stacks);
  for(j = 0; j <= this.slices; j++) {

    var x = r*Math.cos(2*Math.PI*j/this.slices);
    var y = r*Math.sin(2*Math.PI*j/this.slices);
    this.vertices.push(x, y, this.height*i/this.stacks);

    this.normals.push(x, y,radDif*r/this.height);

    this.texCoords.push(j*sSize, i*tSize);
  }
}

for(j = 0; j < this.stacks; j++) {
  for(i = 0; i < this.slices; i++) {

    this.indices.push(i + j*(this.slices + 1));
    this.indices.push((i + 1)%this.slices + j*(this.slices + 1));
    this.indices.push((i + 1)%this.slices + (j + 1)*(this.slices + 1));

    this.indices.push(i + j*(this.slices + 1));
    this.indices.push((i + 1)%this.slices + (j + 1)*(this.slices + 1));
    this.indices.push(i + (j + 1)*(this.slices + 1));
  }
}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

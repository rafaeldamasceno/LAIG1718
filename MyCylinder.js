


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
//this.texCoords = [];

for(i = 0; i <= this.stacks; i++) {
  var r = this.bottomRadius - (this.bottomRadius - this.topRadius)*(i/this.stacks);
  for(j = 0; j <= this.slices; j++) {

    var x = r*Math.cos(2*Math.PI*j/this.slices);
    var y = r*Math.sin(2*Math.PI*j/this.slices);
    this.vertices.push(x, y, this.height*i/this.stacks);

    this.normals.push(x, y,(this.bottomRadius - this.topRadius)*r/this.height);



  }
}

/**
this.vertices.push(0,0,0);
this.normals.push(0,0,-1);
this.vertices.push(0,0,this.height);
this.normals.push(0,0,1);

for(j = 0; j <= this.slices; j++) {
  let xtop = this.topRadius*Math.cos(2*Math.PI*j/this.slices);
  let ytop = this.topRadius*Math.sin(2*Math.PI*j/this.slices);
  let xbot = this.bottomRadius*Math.cos(2*Math.PI*j/this.slices);
  let ybot = this.bottomRadius*Math.sin(2*Math.PI*j/this.slices);
  this.vertices.push(xbot,ybot,0);
  this.normals.push(0,0,-1);
  this.vertices.push(xtop,ytop,this.height);
  this.normals.push(0,0,1);
}

**/
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
/*
var start = (this.vertices + 1)*(this.slices + 1) + 2;

for(j = 0; j < this.slices; j++) {
  this.indices.push(j*2 + start);
  this.indices.push(j*2 + start + 2);
  this.indices.push(start - 2)

  this.indices.push(j*2 + start + 1);
  this.indices.push(j*2 + start + 3);
  this.indices.push(start - 1)

}

*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

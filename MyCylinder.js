


function MyCylinder(graph, height, bottomRadius, topRadius, stacks, slices, topCap, bottomCap) {
  MyGraphLeaf.call(this, graph);
  this.height = height;
  this.bottomRadius = bottomRadius;
  this.topRadius = topRadius;
  this.slices = slices;
  // this.slices = 3;
  this.stacks = stacks;
  // this.stacks = 1;

  this.topCap = topCap == 1 ? true : false;
  this.bottomCap = bottomCap == 1 ? true : false;

  // console.log(topCap + " " + this.topCap);
  // console.log(bottomCap + " " + this.bottomCap);

  this.topCap = true;
  this.bottomCap = true;

  this.angleDiff = 2 * Math.PI / this.slices;

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
var sSize = 1 / this.slices;
var tSize = 1 / this.stacks;

for(i = 0; i <= this.stacks; i++) {
  var r = this.bottomRadius - radDif*(i/this.stacks);
  for(j = 0; j <= this.slices; j++) {

    var x = r*Math.cos(this.angleDiff*j);
    var y = r*Math.sin(this.angleDiff*j);
    this.vertices.push(x, y, this.height*i/this.stacks);

    this.normals.push(x, y,radDif*r/this.height);

    this.texCoords.push(j*sSize, 1 - i*tSize);
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

var lastIndex = this.vertices.length / 3;

if (this.topCap) {
  for (i = 0; i < this.slices; i++) {
      this.vertices.push(this.topRadius * Math.cos(i * this.angleDiff));
      this.vertices.push(this.topRadius * Math.sin(i * this.angleDiff));
      this.vertices.push(this.height);

      var texS = Math.cos(i * this.angleDiff) * 0.5 + 0.5;
      var texT = -Math.sin(i * this.angleDiff) * 0.5 + 0.5;

      this.texCoords.push(texS, texT);

      this.normals.push(0, 0, 1);
  }

  this.vertices.push(0, 0, this.height);
  this.normals.push(0, 0, 1);
  this.texCoords.push(0.5, 0.5);

  var topVertex = this.vertices.length / 3 - 1;

  for (i = 0; i < this.slices; i++) {
      this.indices.push(lastIndex + i % this.slices);
      this.indices.push(lastIndex + (i + 1) % this.slices);
      this.indices.push(topVertex);
  }

}

lastIndex = this.vertices.length / 3;

if (this.bottomCap) {
  for (i = 0; i < this.slices; i++) {
      this.vertices.push(this.bottomRadius * Math.cos(i * -this.angleDiff));
      this.vertices.push(this.bottomRadius * Math.sin(i * -this.angleDiff));
      this.vertices.push(0);

      var texS = Math.cos(i * -this.angleDiff) * 0.5 + 0.5;
      var texT = -Math.sin(i * -this.angleDiff) * 0.5 + 0.5;

      this.texCoords.push(texS, texT);

      this.normals.push(0, 0, -1);
  }

  this.vertices.push(0, 0, 0);
  this.normals.push(0, 0, -1);
  this.texCoords.push(0.5, 0.5);

  var topVertex = this.vertices.length / 3 - 1;

  for (i = 0; i < this.slices; i++) {
      this.indices.push(lastIndex + i % this.slices);
      this.indices.push(lastIndex + (i + 1) % this.slices);
      this.indices.push(topVertex);
  }

}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};




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

  this.topCap = true;

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


// var radDif = this.bottomRadius - this.topRadius;
// var sSize = Math.sin(Math.PI/this.slices) * this.bottomRadius * 2;
// var tSize = Math.sqrt(this.height * this.height + radDif * radDif) / this.stacks;
//
// for(i = 0; i <= this.stacks; i++) {
//   var r = this.bottomRadius - radDif*(i/this.stacks);
//   for(j = 0; j <= this.slices; j++) {
//
//     var x = r*Math.cos(2*Math.PI*j/this.slices);
//     var y = r*Math.sin(2*Math.PI*j/this.slices);
//     this.vertices.push(x, y, this.height*i/this.stacks);
//
//     this.normals.push(x, y,radDif*r/this.height);
//
//     this.texCoords.push(j*sSize, i*tSize);
//   }
// }
//
// for(j = 0; j < this.stacks; j++) {
//   for(i = 0; i < this.slices; i++) {
//
//     this.indices.push(i + j*(this.slices + 1));
//     this.indices.push((i + 1)%this.slices + j*(this.slices + 1));
//     this.indices.push((i + 1)%this.slices + (j + 1)*(this.slices + 1));
//
//     this.indices.push(i + j*(this.slices + 1));
//     this.indices.push((i + 1)%this.slices + (j + 1)*(this.slices + 1));
//     this.indices.push(i + (j + 1)*(this.slices + 1));
//   }
// }

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
      this.indices.push(i % this.slices);
      this.indices.push((i + 1) % this.slices);
      this.indices.push(topVertex);
  }

}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph) {
  CGFobject.call(this, graph.scene);

  this.saf = 1;
  this.taf = 1;
}

MyGraphLeaf.prototype = Object.create(CGFobject.prototype);
MyGraphLeaf.prototype.constructor = MyGraphLeaf;

MyGraphLeaf.prototype.updateTexScaling = function (saf, taf) {
  this.saf = saf;
  this.taf = taf;

  if (this.origTexCoords == null) {
    return;
  }

  this.texCoords = this.origTexCoords.slice();;

  for (var i = 0; i < this.texCoords.length; i++) {
    this.texCoords[i] /= i % 2 == 0 ? this.saf : this.taf;
  }

  this.initGLBuffers();
}

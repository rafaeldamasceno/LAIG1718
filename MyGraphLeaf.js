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
  
}

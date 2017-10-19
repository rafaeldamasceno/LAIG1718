/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
 **/
function MyGraphNode(graph, nodeID) {
  this.graph = graph;

  this.nodeID = nodeID;

  // IDs of child nodes.
  this.children = [];

  // IDs of child nodes.
  this.leaves = [];

  // The material ID.
  this.materialID = null;

  // The texture ID.
  this.textureID = null;

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function (nodeID) {
  this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function (leaf) {
  this.leaves.push(leaf);
}

MyGraphNode.prototype.display = function (materialID, textureID = null) {

  var newTexture = this.textureID;
  if (this.textureID == "null") {
    newTexture = textureID;
  } else if (this.textureID == "clear") {
    newTexture = null;
  }

  var newMaterial = this.materialID;
  if (this.materialID == "null") {
    newMaterial = materialID;
  }

  this.graph.scene.pushMatrix();
  this.graph.scene.multMatrix(this.transformMatrix);

  this.graph.materials[newMaterial].apply();
  if (newTexture != null) {
    this.graph.textures[newTexture][0].bind();
  }

  //ciclo de leafs
  for (var i = 0; i < this.leaves.length; i++) {
    if (newTexture != null) {
      this.leaves[i].updateTexScaling(this.graph.textures[newTexture][1], this.graph.textures[newTexture][2]);
    }
    this.leaves[i].display();
  }

  if (newTexture != null) {
    this.graph.textures[newTexture][0].unbind();
  }

  for (var i = 0; i < this.children.length; i++) {
    this.graph.nodes[this.children[i]].display(newMaterial, newTexture);
  }

  this.graph.scene.popMatrix();
}

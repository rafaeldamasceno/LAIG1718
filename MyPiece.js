/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
 **/
function MyPiece(graph, nodeID, pickingID) {
  this.graph = graph;

  this.nodeID = nodeID;

  this.pickingID = pickingID;

  //Piece new elements
  this.shaderFlag = false;

  this.played = false;

  this.holeUp = null;

  this.dualPiece = false;

  switch (this.pickingID / 10 >> 0) {
    case 3:
      this.position = this.graph.plainPiecesPosition[(this.pickingID % 10) - 1];
      break;
    case 4:
      this.position = this.graph.holedPiecesPosition[(this.pickingID % 10) - 1];
      break;
    case 5:
      this.position = this.graph.dualPiecesPosition[(this.pickingID % 10) - 1];
      this.dualPiece = true;
      break;
  }

  if(this.position) {
    this.startPosition = this.position;
  }
  
  

  // IDs of child nodes.
  this.children = [];

  // IDs of child nodes.
  this.leaves = [];

  // IDs of animations.
  this.animations = [];
  this.animationsTimes = [0];
  this.currAnimation = null;

  // The material ID.
  this.materialID = null;

  // The texture ID.
  this.textureID = null;

  // Last time that the node was updated.
  this.startTime = null;

  this.coords = [];

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);

  this.animationMatrix = null;
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyPiece.prototype.addChild = function (nodeID) {
  this.children.push(nodeID);
}

/* MyGraphNode.prototype.updateChildPickingIds = function() {
  
  if (this.pickingID == -1) {
    return;
  }
  for(var i = 0; i < this.children.length; i++) {
    console.log(this.pickingID);
    if (this.graph.nodes[this.children[i]].pickingID == -1) {
      this.graph.nodes[this.children[i]].pickingID = this.pickingID;
    }
  }
} */

/**
 * Adds a leaf to this node's leaves array.
 */
MyPiece.prototype.addLeaf = function (leaf) {
  this.leaves.push(leaf);
}

MyPiece.prototype.display = function (materialID, textureID = null) {

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
  let transMatrix = mat4.create();
  mat4.identity(transMatrix);
    //mat4.translate(transMatrix, transMatrix, coords);
  if(!this.animationMatrix) {
    mat4.translate(transMatrix, transMatrix, this.position);
  }

  if (!this.played) {
    this.holeUp = this.graph.holeUp;
  }

  // if(this.pickingID >= 100) {
  //   mat4.rotate(transMatrix, transMatrix, -Math.PI/2, [1, 0, 0]);
  // }

  this.graph.scene.multMatrix(transMatrix);
  this.graph.scene.multMatrix(this.transformMatrix);
  if (this.animationMatrix) {
    this.graph.scene.multMatrix(this.animationMatrix);
    // console.log("applying animation");
  }

  mat4.identity(transMatrix);
  if (this.dualPiece) {
    if(!this.played && !this.graph.holeUp || (this.played && !this.holeUp)) {    
      mat4.translate(transMatrix, transMatrix, [0, 1.2, 0]);
      mat4.rotate(transMatrix, transMatrix, Math.PI, [0, 0, 1]);
    }
  }
  this.graph.scene.multMatrix(transMatrix);

  // Add position to pieces
  //if para melhorar a eficiência (só as peças é que executam o que está a seguir)
 

  this.graph.materials[newMaterial].apply();
  if (newTexture != null) {
    this.graph.textures[newTexture][0].bind();
  }
  //ciclo de leafs
  if (this.shaderFlag) {
    this.graph.scene.setActiveShader(this.graph.testShaders[0]);
  }

  if (this.pickingID) {
    this.graph.scene.registerForPick(this.pickingID, this);
  }

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

  if (this.shaderFlag) {
    this.graph.scene.setActiveShader(this.graph.scene.defaultShader);
  }
  
  if (this.pickingID) {
    this.graph.scene.clearPickRegistration();
  }

  this.graph.scene.popMatrix();

}

MyPiece.prototype.update = function (currTime) {
  for (let i = 0; i < this.children.length; i++) {
    this.graph.nodes[this.children[i]].update(currTime);
  }

  if (this.animations.length == 0 || this.currAnimation >= this.animations.length) {
    return;
  }

  if (!this.startTime) {
    this.startTime = currTime;
    let time = 0;
    for (ani of this.animations) {
      //console.log(ani);
      time += ani.getAnimationTime();
      this.animationsTimes.push(time);
    }
    this.currAnimation = 0;
    return;
  }

  let elapsedTime = currTime - this.startTime;
  let i = 0;

  for (i = this.currAnimation + 1; i < this.animationsTimes.length; i++) {
    if (elapsedTime < this.animationsTimes[i]) {
      elapsedTime -= this.animationsTimes[i - 1];
      break;
    }
  }
  this.currAnimation = i - 1;
  if (this.currAnimation == this.animations.length) {
    this.position = this.animations[this.animations.length - 1].p4;
    this.animations = [];
    this.animationsTimes = [0];
    this.animationMatrix = null;
    
    return;
  }

  this.animationMatrix = this.animations[this.currAnimation].getTransMatrix(elapsedTime);
}

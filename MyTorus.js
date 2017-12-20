function MyTorus(graph, height, smallRadius, bigRadius, stacks, slices) {
  MyGraphLeaf.call(this, graph);

  this.height = height;
  this.smallRadius = smallRadius;
  this.bigRadius = bigRadius;
  this.slices = slices;
  this.stacks = stacks;

  this.angleDiff = 2 * Math.PI / this.slices;

  this.top = 
  this.bottom =

  this.initBuffers();
}

MyTorus.prototype = Object.create(MyGraphLeaf.prototype);
MyTorus.prototype.constructor = MyTorus;

MyTorus.prototype.initBuffers = function () {

  this.vertices = [];
  this.normals = [];
  //this.texCoords = [];

  for (i = 0; i <= this.slices; i++) {
    for (j = 0; j <= this.stacks; j++) {
      this.vertices.push(this.bigRadius * Math.cos(i * this.angleDiff));
      this.vertices.push(this.bigRadius * Math.sin(i * this.angleDiff));
      this.vertices.push(this.height / this.stacks * j);

      this.normals.push(Math.cos(i * this.angleDiff));
      this.normals.push(Math.sin(i * this.angleDiff));
      this.normals.push(0);
    }
  }

  this.indices = [];

  for (i = 0; i < this.slices; i++) {
    for (j = 0; j < this.stacks; j++) {
      this.indices.push(i * (this.stacks + 1) + j);

      this.indices.push((i + 1) * (this.stacks + 1) + j);
      this.indices.push((i + 1) * (this.stacks + 1) + j + 1);

      this.indices.push(i * (this.stacks + 1) + j);
      this.indices.push((i + 1) * (this.stacks + 1) + j + 1);
      this.indices.push(i * (this.stacks + 1) + j + 1);
    }
  }

  let pastV = this.vertices.length / 3; 

  for (i = 0; i <= this.slices; i++) {
    for (j = 0; j <= this.stacks; j++) {
      this.vertices.push(this.smallRadius * Math.cos(i * this.angleDiff));
      this.vertices.push(this.smallRadius * Math.sin(i * this.angleDiff));
      this.vertices.push(this.height / this.stacks * j);

      this.normals.push(-Math.cos(i * this.angleDiff));
      this.normals.push(-Math.sin(i * this.angleDiff));
      this.normals.push(0);
    }
  }

  for (i = 0; i < this.slices; i++) {
    for (j = 0; j < this.stacks; j++) {
      this.indices.push(pastV + i * (this.stacks + 1) + j);
      this.indices.push(pastV + (i + 1) * (this.stacks + 1) + j + 1);
      this.indices.push(pastV + (i + 1) * (this.stacks + 1) + j);

      this.indices.push(pastV + i * (this.stacks + 1) + j);
      this.indices.push(pastV + i * (this.stacks + 1) + j + 1);
      this.indices.push(pastV + (i + 1) * (this.stacks + 1) + j + 1);
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

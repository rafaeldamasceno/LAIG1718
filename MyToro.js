function MyToro(graph, height, smallRadius, bigRadius, stacks, slices) {
  MyGraphLeaf.call(this, graph);
  this.height = height;
  this.smallRadius = smallRadius;
  this.bigRadius = bigRadius;
  this.slices = slices;
  this.stacks = stacks;

  this.angleDiff = 2 * Math.PI / this.slices;

  this.initBuffers();
}

MyToro.prototype = Object.create(MyGraphLeaf.prototype);
MyToro.prototype.constructor = MyToro;

MyToro.prototype.initBuffers = function() {

  this.vertices = [];
  this.normals = [];
  this.indices = [];
  this.texCoords = [];

  var radPer = this.smallRadius/this.bigRadius;

  for (i = 0; i <= this.slices; i++) {
    var x = Math.cos(i * this.angleDiff);
    var y = Math.sin(i * this.angleDiff);
    for (j = 0; j <= this.stacks; j++) {
      this.vertices.push(x * this.smallRadius);
      this.vertices.push(y * this.smallRadius);
      this.vertices.push(this.height / this.stacks * j);

      this.normals.push(x);
      this.normals.push(y);
      this.normals.push(0);

      this.texCoords.push(1 / this.slices * i, -1 / this.stacks * j);

      this.vertices.push(x * this.bigRadius);
      this.vertices.push(y * this.bigRadius);
      this.vertices.push(this.height / this.stacks * j);

      this.normals.push(-x);
      this.normals.push(-y);
      this.normals.push(0);

      this.texCoords.push(radPer / this.slices * i, -radPer / this.stacks * j);
    }
  }

  for (i = 0; i < this.slices; i++) {
    for (j = 0; j < this.stacks; j++) {
      this.indices.push(((i + 1) * (this.stacks + 1) + j + 1) * 2);
      this.indices.push((i * (this.stacks + 1) + j) * 2);
      this.indices.push(((i + 1) * (this.stacks + 1) + j) * 2);
      
      this.indices.push((i * (this.stacks + 1) + j + 1) * 2);
      this.indices.push((i * (this.stacks + 1) + j) * 2);
      this.indices.push(((i + 1) * (this.stacks + 1) + j + 1) * 2);
      


      this.indices.push(((i * (this.stacks + 1) + j) * 2) + 1);
      this.indices.push((((i + 1) * (this.stacks + 1) + j) * 2) + 1);
      this.indices.push((((i + 1) * (this.stacks + 1) + j + 1) * 2) + 1);

      this.indices.push(((i * (this.stacks + 1) + j) * 2) + 1);
      this.indices.push((((i + 1) * (this.stacks + 1) + j + 1) * 2) + 1);
      this.indices.push(((i * (this.stacks + 1) + j + 1) * 2) + 1);
    }
  }
/*
  var lastIndex = this.vertices.length / 3;

  if (this.topCap) {
    for (i = 0; i < this.slices; i++) {
      this.vertices.push(this.bigRadius * Math.cos(i * this.angleDiff));
      this.vertices.push(this.bigRadius * Math.sin(i * this.angleDiff));
      this.vertices.push(this.height);

      this.vertices.push(this.smallRadius * Math.cos(i * this.angleDiff));
      this.vertices.push(this.smallRadius * Math.sin(i * this.angleDiff));
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

}*/

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

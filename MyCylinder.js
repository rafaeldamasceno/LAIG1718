function MyCylinder(graph, height, bottomRadius, topRadius, stacks, slices, topCap, bottomCap) {
  MyGraphLeaf.call(this, graph);
  this.height = height;
  this.bottomRadius = bottomRadius;
  this.topRadius = topRadius;
  this.slices = slices;
  this.stacks = stacks;

  this.topCap = topCap == 1 ? true : false;
  this.bottomCap = bottomCap == 1 ? true : false;

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

  for (i = 0; i <= this.slices; i++) {
    var x = Math.cos(i * this.angleDiff);
    var y = Math.sin(i * this.angleDiff);
    for (j = 0; j <= this.stacks; j++) {
      var r = this.bottomRadius - j * radDif / this.stacks;
      this.vertices.push(x * r);
      this.vertices.push(y * r);
      this.vertices.push(this.height / this.stacks * j);

      this.normals.push(x * r);
      this.normals.push(y * r);
      this.normals.push(radDif * r / this.height);

      this.texCoords.push(1 / this.slices * i, -1 / this.stacks * j);
    }
  }

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

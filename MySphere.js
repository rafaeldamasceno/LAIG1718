function MySphere(graph, radius, slices, stacks) {
  MyGraphLeaf.call(this, graph);
  this.radius = radius;
  this.slices = slices;
  this.stacks = stacks;

  this.slicesAngle = Math.PI * 2 / this.slices;
  this.stacksAngle = Math.PI / 2 / this.stacks;

  this.initBuffers();
}

MySphere.prototype = Object.create(MyGraphLeaf.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function () {
  this.vertices = [];
  this.normals = [];
  this.indices = [];
  this.texCoords = [];

  for (i = 0; i <= this.slices; i++) {
    for (j = 0; j <= this.stacks; j++) {
      var x, y, z;
      var tetha, phi;

      tetha = Math.PI / 2 - (j * this.stacksAngle);
      phi = i * this.slicesAngle;

      x = this.radius * Math.sin(tetha) * Math.cos(phi);
      y = this.radius * Math.sin(tetha) * Math.sin(phi);
      z = this.radius * Math.cos(tetha);

      this.vertices.push(x, y, z);
      this.normals.push(x, y, z);

      var texS = i * this.slicesAngle / (2 * Math.PI);
      var texT = -j * this.stacksAngle / Math.PI + 0.5;

      this.texCoords.push(texS, texT);
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

  var lastVertex = this.vertices.length / 3;

  // other half

  for (i = 0; i <= this.slices; i++) {
    for (j = 0; j <= this.stacks; j++) {
      var x, y, z;
      var tetha, phi;

      tetha = Math.PI / 2 + (j * this.stacksAngle);
      phi = -i * this.slicesAngle;

      x = this.radius * Math.sin(tetha) * Math.cos(phi);
      y = this.radius * Math.sin(tetha) * Math.sin(phi);
      z = this.radius * Math.cos(tetha);

      this.vertices.push(x, y, z);
      this.normals.push(x, y, z);

      var texS = -i * this.slicesAngle / (Math.PI * 2) + 1;
      var texT = (j * this.stacksAngle) / Math.PI + 0.5;

      this.texCoords.push(texS, texT);
    }
  }

  for (i = 0; i < this.slices; i++) {
    for (j = 0; j < this.stacks; j++) {
      this.indices.push(lastVertex + i * (this.stacks + 1) + j);
      this.indices.push(lastVertex + (i + 1) * (this.stacks + 1) + j);
      this.indices.push(lastVertex + (i + 1) * (this.stacks + 1) + j + 1);

      this.indices.push(lastVertex + i * (this.stacks + 1) + j);
      this.indices.push(lastVertex + (i + 1) * (this.stacks + 1) + j + 1);
      this.indices.push(lastVertex + i * (this.stacks + 1) + j + 1);
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

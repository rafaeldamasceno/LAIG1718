

function MyRectangle(graph, xi, yi, xf, yf) {
  MyGraphLeaf.call(this, graph);
  this.xi = xi;
  this.xf = xf;
  this.yi = yi;
  this.yf = yf;

  this.initBuffers();
};

MyRectangle.prototype = Object.create(MyGraphLeaf.prototype);
MyRectangle.prototype.constructor = MyRectangle;

MyRectangle.prototype.initBuffers = function () {
  this.vertices = [
    this.xi, this.yi, 0,
    this.xi, this.yf, 0,
    this.xf, this.yf, 0,
    this.xf, this.yi, 0
  ];

  this.indices = [
    0, 1, 2,
    0, 2, 3
  ];

  this.normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
  ];

  // this.origTexCoords = [0, Math.abs(this.yf - this. yi), 0, 0, Math.abs(this.xf - this. xi), 0, Math.abs(this.xf - this. xi), Math.abs(this.yf - this. yi)];
  this.origTexCoords = [0, this.yf - this. yi, 0, 0, this.xf - this. xi, 0, this.xf - this. xi, this.yf - this. yi];

  this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};

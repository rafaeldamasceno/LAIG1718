

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
    this.xf, this.yi, 0,
    this.xi, this.yf, 0,
    this.xf, this.yf, 0,
  ];

  this.indices = [
    2, 1, 0,
    1, 2, 3,
  ];

  this.normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
  ];

  this.texCoords = [0, 0, 0, 1, 1, 0, 1, 1];  

  this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};

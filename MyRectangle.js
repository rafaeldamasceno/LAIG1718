

function MyRectangle(graph, xi, yi, xf, yf) {
  MyGraphLeaf.call(this, graph);
  this.xi = xi;
  this.xf = xf;
  this.yi = yi;
  this.yf = yf;
}

MyRectangle.prototype = Object.create(MyGraphLeaf.prototype);
MyRectangle.prototype.constructor = MyRectangle;

 function MyNurb(graph, degreeU, degreeV, controlvertexes) {
  MyGraphLeaf.call(this, graph)

  var knots1 = this.getKnotsVector(degreeU);
  var knots2 = this.getKnotsVector(degreeV);

	var nurbsSurface = new CGFnurbsSurface(degreeU, degreeV, knots1, knots2, controlvertexes);

  getSurfacePoint = function(u, v) {
  return nurbsSurface.getPoint(u, v);
};

};

MyNurb.prototype = Object.create(MyGraphLeaf.prototype);
MyNurb.prototype.constructor = MyNurb;

MyNurb.prototype.getKnotsVector = function(degree) {

	var knotsAux = [];
	for (var i=0; i<=degree; i++) {
		knotsAux.push(0);
	}
	for (var i=0; i<=degree; i++) {
		knotsAux.push(1);
	}

};

 function MyNurb(graph, divU, divV, controlvertexes) {
  MyGraphLeaf.call(this, graph)

  // this.divU = divU;
  // this.divV = divV;

  var degreeU = controlvertexes.length - 1;
  var degreeV = controlvertexes[0].length - 1;
  var knots1 = this.getKnotsVector(degreeU);
  var knots2 = this.getKnotsVector(degreeV);

	var nurbsSurface = new CGFnurbsSurface(degreeU, degreeV, knots1, knots2, controlvertexes);

  getSurfacePoint = function(u, v) {
  return nurbsSurface.getPoint(u, v);
};

  this.nurbsObject = new CGFnurbsObject(graph.scene, getSurfacePoint, divU, divV);

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

  return knotsAux;
};

MyNurb.prototype.display = function() {
  this.nurbsObject.display();
}

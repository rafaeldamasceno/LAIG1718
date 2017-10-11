 function MyNurb(graph, degreeU, degreeV, controlvertexes) {



/**
  this.getKnotsVector(degreeU);
  var knots1 = this.knotsAux;
	this.getKnotsVector(degreeV);
  var knots2 = this.knotsAux;

	var nurbsSurface = new CGFnurbsSurface(degreeU, degreeV, knots1, knots2, controlvertexes);

  var u;
  var v;
	CGFnurbsObject.call(graph.scene, nurbsSurface.getPoint(u, v), 20, 20 );*/
};

MyNurb.prototype = Object.create(CGFnurbsObject.prototype);
MyNurb.prototype.constructor = MyNurb;

/**
MyNurb.prototype.getKnotsVector = function(degree) {

	this.knotsAux = [];
	for (var i=0; i<=degree; i++) {
		this.knotsAux.push(0);
	}
	for (var i=0; i<=degree; i++) {
		this.knotsAux.push(1);
	}

};
*/

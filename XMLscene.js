var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
  CGFscene.call(this);

  this.interface = interface;
  this.selectedObject = "";

  this.lightValues = {};
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function (application) {
  CGFscene.prototype.init.call(this, application);

  this.initCameras();

  this.enableTextures(true);

  this.gl.clearDepth(100.0);
  this.gl.enable(this.gl.DEPTH_TEST);
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.depthFunc(this.gl.LEQUAL);

  this.axis = new CGFaxis(this);

  this.setPickEnabled(true);
}

XMLscene.prototype.update = function (currTime) {
  this.graph.update(currTime);
}
/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function () {
  var i = 0;
  // Lights index.

  // Reads the lights from the scene graph.
  for (var key in this.graph.lights) {
    if (i >= 8)
      break; // Only eight lights allowed by WebGL.

    if (this.graph.lights.hasOwnProperty(key)) {
      var light = this.graph.lights[key];

      this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
      this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
      this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
      this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

      this.lights[i].setVisible(true);
      if (light[0])
        this.lights[i].enable();
      else
        this.lights[i].disable();

      this.lights[i].update();

      i++;
    }
  }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function () {
  this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0.1, 15, 0.1), vec3.fromValues(0, 0, 0));
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function () {
  this.camera.near = this.graph.near;
  this.camera.far = this.graph.far;
  this.axis = new CGFaxis(this, this.graph.referenceLength);

  this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

  this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

  this.initLights();

  // Adds lights group.
  //this.interface.addLightsGroup(this.graph.lights);

  this.setUpdatePeriod(1000 / 60);
}

/**
 * Displays the scene.
 */

XMLscene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
				var obj = this.pickResults[0][0];
				if (obj)
				{
          var customId = this.pickResults[0][1];				
          this.pickingHandle(customId, obj);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}

XMLscene.prototype.pickingHandle = function(ID, object) {
  console.log(ID);
    if(ID == 1) {
      this.graph.idRoot = "root";
      return;
    }
    let currentID;
    switch (ID / 10 >> 0) {
    case 1: //Ids para os botões de tipo de jogo
      currentID = 10 + this.graph.game.gamemode;
      console.log("here");
      //console.log(this.graph.nodes[this.graph.pickingIdToId[currentID]]);
      this.graph.nodes[this.graph.pickingIdToId[currentID]].shaderFlag = false;
      this.graph.game.gamemode = ID % 10;
      object.shaderFlag = true;
      return;
    case 2: //Ids para os botões de dificuldade do AI
      currentID = 20 + this.graph.game.difficulty;
      this.graph.nodes[this.graph.pickingIdToId[currentID]].shaderFlag = false;
      this.graph.game.difficulty = ID % 10;
      object.shaderFlag = true;
      return;
    case 3: //Ids para as peças plain
    case 4: //Ids para as peças holed
    case 5: //Ids para as peças dual
      if(this.graph.currPlayingPiece) {
        this.graph.currPlayingPiece.shaderFlag = false;
        this.graph.invisiblePieces = [];
      }
      this.graph.currPlayingPiece = object;
      object.shaderFlag = true;
      this.graph.createInvisiblePieces();
      return;
    }
}
XMLscene.prototype.display = function () {
  this.logPicking();
	this.clearPickRegistration();
  // ---- BEGIN Background, camera and axis setup

  // Clear image and depth buffer everytime we update the scene
  this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  // Initialize Model-View matrix as identity (no transformation
  this.updateProjectionMatrix();
  this.loadIdentity();

  // Apply transformations corresponding to the camera position relative to the origin
  this.applyViewMatrix();

  this.pushMatrix();

  if (this.graph.loadedOk) {
    // Applies initial transformations.
    this.multMatrix(this.graph.initialTransforms);

    // Draw axis
    this.axis.display();

    var i = 0;
    for (var key in this.lightValues) {
      if (this.lightValues.hasOwnProperty(key)) {
        if (this.lightValues[key]) {
          this.lights[i].setVisible(true);
          this.lights[i].enable();
        } else {
          this.lights[i].setVisible(false);
          this.lights[i].disable();
        }
        this.lights[i].update();
        i++;
      }
    }

    // Displays the scene.
    this.graph.displayScene();

  } else {
    // Draw axis
    this.axis.display();
  }

  this.popMatrix();

  // ---- END Background, camera and axis setup

}

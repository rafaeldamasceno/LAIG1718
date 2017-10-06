


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

MySphere.prototype.initBuffers = function() {
  this.vertices = [];
  this.normals = [];
  this.indices = [];
 // 	this.texCoords = [];

 for (i = 0; i <= this.slices; i++) {
   for (j = 0; j < this.stacks; j++) {
       var x, y, z;
       var tetha, phi;

       tetha = Math.PI / 2 - (j * this.stacksAngle);
       phi = i * this.slicesAngle;

       x = this.radius * Math.sin(tetha) * Math.cos(phi);
       y = this.radius * Math.sin(tetha) * Math.sin(phi);
       z = this.radius * Math.cos(tetha);

       this.vertices.push(x, y, z);
       this.normals.push(x, y, z);

      //  var texS = Math.sin(tetha) * Math.cos(phi) * 0.5 + 0.5;
      //  var texT = Math.sin(tetha) * Math.sin(phi) * 0.5 + 0.5;
       //
      //  this.texCoords.push(texS, texT);
   }
 }

 this.vertices.push(0, 0, this.radius);
 this.normals.push(0, 0, this.radius);

 for (i = 0; i < this.slices; i++) {
        for (j = 0; j < this.stacks - 1; j++) {
            this.indices.push(i * this.stacks + j);
            this.indices.push((i + 1) * this.stacks + j);
            this.indices.push((i + 1) * this.stacks + j + 1);

            this.indices.push(i * this.stacks + j);
            this.indices.push((i + 1) * this.stacks + j + 1);
            this.indices.push(i * this.stacks + j + 1);
        }
    }

    var topVertex = this.vertices.length / 3 - 1;

    for (i = 0; i < this.slices; i++) {
        this.indices.push(i * this.stacks + this.stacks - 1);
        this.indices.push((i + 1) * this.stacks + this.stacks - 1);
        this.indices.push(topVertex);
    }

    var lastVertex = this.vertices.length / 3;

    // other half

    for (i = 0; i <= this.slices; i++) {
      for (j = 0; j < this.stacks; j++) {
          var x, y, z;
          var tetha, phi;

          tetha = Math.PI / 2 + (j * this.stacksAngle);
          phi = -i * this.slicesAngle;

          x = this.radius * Math.sin(tetha) * Math.cos(phi);
          y = this.radius * Math.sin(tetha) * Math.sin(phi);
          z = this.radius * Math.cos(tetha);

          this.vertices.push(x, y, z);
          this.normals.push(x, y, z);

         //  var texS = Math.sin(tetha) * Math.cos(phi) * 0.5 + 0.5;
         //  var texT = Math.sin(tetha) * Math.sin(phi) * 0.5 + 0.5;
          //
         //  this.texCoords.push(texS, texT);
      }
    }

    this.vertices.push(0, 0, -this.radius);
    this.normals.push(0, 0, -this.radius);

    for (i = 0; i < this.slices; i++) {
           for (j = 0; j < this.stacks - 1; j++) {
               this.indices.push(lastVertex + i * this.stacks + j);
               this.indices.push(lastVertex + (i + 1) * this.stacks + j);
               this.indices.push(lastVertex + (i + 1) * this.stacks + j + 1);

               this.indices.push(lastVertex + i * this.stacks + j);
               this.indices.push(lastVertex + (i + 1) * this.stacks + j + 1);
               this.indices.push(lastVertex + i * this.stacks + j + 1);
           }
       }

    topVertex = this.vertices.length / 3 - 1;

       for (i = 0; i < this.slices; i++) {
           this.indices.push(lastVertex + i * this.stacks + this.stacks - 1);
           this.indices.push(lastVertex + (i + 1) * this.stacks + this.stacks - 1);
           this.indices.push(topVertex);
       }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

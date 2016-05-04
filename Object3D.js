/*

Created by:
Zack Rauen

*/

var ObjectVShaderID = "vertexShader";
var ObjectFShaderID = "fragShader";

var minSize = 0.1;
Object3D.textureCount = 0;

function Object3D (gl, vertices, indexes, textureCoords, imageid, color, VShader, FShader) {
	this.gl = gl;
	this.vertices = vertices;
	this.indexList = indexes;
	this.textureCoords = textureCoords || false;

	ObjectVShaderID = VShader == null ? ObjectVShaderID : VShader;
	ObjectFShaderID = FShader == null ? ObjectFShaderID : FShader;
	
	this.eye = vec3(0.0,0.0,1.0);
	this.lookAt = vec3(0.0,0.0,0.0);
	
	this.attachShaders();
	
	this.indexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER,	new Uint8Array(this.indexList), gl.STATIC_DRAW );

	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER,	flatten(this.vertices), gl.STATIC_DRAW );

	
	this.vertexNormals = getVertexNormals(this.vertices, this.indexList, this.vertices.length, this.indexList.length/3);
	this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertexNormals), gl.STATIC_DRAW);
	
	if (!this.textureCoords) {
		
	var u_color = color || vec4(0.0,0.0,1.0,1.0);
	if (u_color.length != this.vertices.length) {
		this.color = u_color;
		for (var i=u_color.length;i<this.vertices.length;i++) {
			this.color.push(u_color[u_color.length-1]);
		}
	}
	else this.color = u_color;
		
		this.textureID = -1;
		this.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,flatten(this.color),gl.STATIC_DRAW);
	}
	else {
		this.texture = gl.createTexture();
		this.textureID = Object3D.textureCount;
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		// Fill the texture with a 1x1 blue pixel.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
					  new Uint8Array([0, 0, 0, 255]));
		// Asynchronously load an image
		var image = document.getElementById(imageid)
		  gl.bindTexture(gl.TEXTURE_2D, this.texture);
		  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
		  gl.generateMipmap(gl.TEXTURE_2D);
		  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		  //gl.uniform1i(gl.getUniformLocation(this.shaderProgram, "texMap0"), 0);
		  Object3D.textureCount++;
		this.texBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, flatten(this.textureCoords), gl.STATIC_DRAW);
		this.textureActive = gl.getParameter(gl.ACTIVE_TEXTURE);
	}
	
	this.setupAnimationVars();
	this.Modelview();
	this.Projection();
}

Object3D.prototype.setupAnimationVars = function() {
	this.rotation = {};
	this.rotation["X"] = 0;
	this.rotation["Y"] = 0;
	this.rotation["Z"] = 0;
	
	this.rotationDelta = {};
	this.rotationDelta["X"] = 0;
	this.rotationDelta["Y"] = 0.01;
	this.rotationDelta["Z"] = 0;
	
	this.rotationDirection = {};
	this.rotationDirection["X"] = 1;
	this.rotationDirection["Y"] = -1;
	this.rotationDirection["Z"] = 1;
	
	this.rotationLimit = {};
	this.rotationLimit["X"] = [0,0];
	this.rotationLimit["Y"] = [0,2*Math.PI];
	this.rotationLimit["Z"] = [0,0];
	
	this.translation = {};
	this.translation["X"] = 0;
	this.translation["Y"] = 0;
	this.translation["Z"] = 0;
	
	this.translationDelta = {};
	this.translationDelta["X"] = 0;
	this.translationDelta["Y"] = 0;
	this.translationDelta["Z"] = 0;
	
	this.translationDirection = {};
	this.translationDirection["X"] = 1;
	this.translationDirection["Y"] = -1;
	this.translationDirection["Z"] = 1;
	
	this.translationLimit = {};
	this.translationLimit["X"] = [0,0];
	this.translationLimit["Y"] = [0,0];
	this.translationLimit["Z"] = [0,0];
	
	this.scale = {};
	this.scale["X"] = 1;
	this.scale["Y"] = 1;
	this.scale["Z"] = 1;
}

Object3D.prototype.setRotationForward = function (axis) {
	this.rotationDirection[axis.toUpperCase()] = 1;
}
Object3D.prototype.setRotationBackward = function (axis) {
	this.rotationDirection[axis.toUpperCase()] = -1;
}
Object3D.prototype.switchRotationDirection = function (axis) {
	this.rotationDirection[axis.toUpperCase()] *= -1;
}
Object3D.prototype.setRotationLimits = function(lower, upper, axis) {
	this.rotationLimit[axis.toUpperCase()] = [lower,upper];
}
Object3D.prototype.setRotationDelta = function(delta, axis) {
	this.rotationDelta[axis.toUpperCase()] = delta;
}
Object3D.prototype.setRotation = function(rotation, axis) {
	this.rotation[axis.toUpperCase()] = rotation;
}

Object3D.prototype.setTranslationForward = function (axis) {
	this.translationDirection[axis.toUpperCase()] = 1;
}
Object3D.prototype.setTranslationBackward = function (axis) {
	this.translationDirection[axis.toUpperCase()] = -1;
}
Object3D.prototype.switchTranslationDirection = function (axis) {
	this.translationDirection[axis.toUpperCase()] *= -1;
}
Object3D.prototype.setTranslationLimits = function(lower, upper, axis) {
	this.translationLimit[axis.toUpperCase()] = [lower,upper];
}
Object3D.prototype.setTranslationDelta = function(delta, axis) {
	this.translationDelta[axis.toUpperCase()] = delta;
}
Object3D.prototype.setTranslation = function(translation, axis) {
	if (axis)
		this.translation[axis.toUpperCase()] = translation;
	else {
		this.translation["X"] = translation;
		this.translation["Y"] = translation;
		this.translation["Z"] = translation;
	}
}

Object3D.prototype.setScale = function(scale, axis) {
	if (axis)
		this.scale[axis.toUpperCase()] = scale;
	else {
		this.scale["X"] = scale;
		this.scale["Y"] = scale;
		this.scale["Z"] = scale;
	}
}


Object3D.prototype.getNextRotation = function(axis) {
	if (this.rotationLimit[axis.toUpperCase()][0] != null && this.rotationLimit[axis.toUpperCase()][1] != null &&
		((this.rotation[axis.toUpperCase()] >= this.rotationLimit[axis.toUpperCase()][1]) || (this.rotation[axis.toUpperCase()] <= this.rotationLimit[axis.toUpperCase()][0])))
		this.switchRotationDirection(axis);
	this.rotation[axis.toUpperCase()]+=(this.rotationDelta[axis.toUpperCase()]*this.rotationDirection[axis.toUpperCase()]) % (this.rotationLimit[axis.toUpperCase()][1] == null ? 360 : 1);

}

Object3D.prototype.getNextTranslation = function(axis) {
	if ((this.translation[axis.toUpperCase()] >= this.translationLimit[axis.toUpperCase()][1]) || (this.translation[axis.toUpperCase()] <= this.translationLimit[axis.toUpperCase()][0]))
		this.switchTranslationDirection(axis);
	this.translation[axis.toUpperCase()]+=(this.translationDelta[axis.toUpperCase()]*this.translationDirection[axis.toUpperCase()]);
}

Object3D.prototype.animate = function () {
	var axes = ["X", "Y", "Z"];
	for (var axis = 0; axis<axes.length; axis++) {
		this.getNextRotation(axes[axis]);
		this.getNextTranslation(axes[axis]);
	}
}

Object3D.prototype.render = function() {
	this.animate();
	gl.useProgram(this.shaderProgram);
	this.attachVariables();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
	
	if (this.textureCoords) {
		gl.activeTexture(this.textureActive);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
	}
	
	this.gl.drawElements(gl.TRIANGLES, this.vertices.length, gl.UNSIGNED_BYTE, 0);
	this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.vertices.length);
	if (this.textureCoords)
		gl.bindTexture(gl.TEXTURE_2D, null);
	this.detachVariables();
}

Object3D.prototype.attachShaders = function() {
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, document.getElementById(ObjectVShaderID).text);
    gl.compileShader(vertexShader);
	
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, document.getElementById(ObjectFShaderID).text );
	gl.compileShader(fragShader);
	
	this.shaderProgram = gl.createProgram();
	this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
	this.gl.linkProgram(this.shaderProgram);
}

Object3D.prototype.enableAttribs = function() {
	gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
	this.vertexPosition = gl.getAttribLocation(this.shaderProgram, "vertexPosition");
	gl.vertexAttribPointer(this.vertexPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(this.vertexPosition);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
	this.nv = gl.getAttribLocation(this.shaderProgram,"nv");
    gl.vertexAttribPointer(this.nv, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(this.nv);
	
	if (!this.textureCoords) {
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		this.vertexColor = gl.getAttribLocation(this.shaderProgram, "vertexColor");
		gl.vertexAttribPointer(this.vertexColor, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.vertexColor);
	}
	else {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
		this.texPosition = gl.getAttribLocation(this.shaderProgram, "texturePosition");
		gl.vertexAttribPointer(this.texPosition, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(this.texPosition);
	}
}

Object3D.prototype.disableAttribs = function() {
	gl.disableVertexAttribArray(this.vertexPosition);
    gl.disableVertexAttribArray(this.nv );
	
	if (!this.textureCoords) {
		gl.disableVertexAttribArray(this.vertexColor);
	}
	else {
		gl.disableVertexAttribArray(this.texPosition);
	}
}

Object3D.prototype.detachVariables = function() {
	this.disableAttribs();
}

Object3D.prototype.attachVariables = function() {

	this.enableAttribs();
	
	gl.uniform3fv(gl.getUniformLocation(this.shaderProgram, "reverseVector"), flatten(vec3(-5.0, 0.0, 5.0)));
	gl.uniform3fv(gl.getUniformLocation(this.shaderProgram, "reverseVector2"), flatten(vec3(5.0, 0.0, -5.0)));
	

	
	if (this.textureCoords)
		gl.uniform1i(gl.getUniformLocation(this.shaderProgram, "texMap0"), this.textureID);
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "isTexture"), this.textureID);
	
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram,"xrot"),this.rotation["X"]);
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram,"yrot"),this.rotation["Y"]);
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram,"zrot"),this.rotation["Z"]);
	
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "xscale"), this.scale["X"]); 
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "yscale"), this.scale["Y"]); 
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "zscale"), this.scale["Z"]);
	
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "xshift"), this.translation["X"]); 
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "yshift"), this.translation["Y"]); 
	gl.uniform1f(gl.getUniformLocation(this.shaderProgram, "zshift"), this.translation["Z"]);
}

Object3D.prototype.Modelview = function(eye, at) {
	gl.useProgram(this.shaderProgram);
	var e = eye || this.eye;
	var a = at || this.lookAt;
	var vectorup = vec3( 0.0, 1.0, 0.0 );
	var n = normalize( vec3( e[0]-a[0], e[1]-a[1], e[2]-a[2]));
	var u = normalize( cross( vectorup, n));
	var v = normalize( cross( n, u));
	var modelviewmatrix = [u[0], v[0], n[0], 0.0,
							u[1], v[1], n[1], 0.0,
							u[2], v[2], n[2], 0.0,
							-u[0]*e[0]-u[1]*e[1]-u[2]*e[2],
							-v[0]*e[0]-v[1]*e[1]-v[2]*e[2],
							-n[0]*e[0]-n[1]*e[1]-n[2]*e[2], 1.0];
	var inversetranspose = [u[0], v[0], n[0], e[0],
							u[1], v[1], n[1], e[1],
							u[2], v[2], n[2], e[2],
							0.0, 0.0, 0.0, 1.0];
	var modelviewlocation = gl.getUniformLocation( this.shaderProgram, "M");
	gl.uniformMatrix4fv(modelviewlocation, false, modelviewmatrix);
	var inversetransposelocation = gl.getUniformLocation( this.shaderProgram, "M_inversetranspose");
	gl.uniformMatrix4fv(inversetransposelocation, false, inversetranspose);
	this.eye = e;
}

Object3D.prototype.Projection = function(top_, right, bottom, left, near, far) {
	var left = left || -.2;
	var right = right || .2;
	var top_ = top_ || .2;
	var bottom = bottom || -.2;
	var far = far || 10.0;
	var near = near || 1.0;
	
	var perspectiveProjectionMatrix = [2.0*near/(right-left), 0.0, 0.0, 0.0,
										0.0, 2.0*near/(top_-bottom), 0.0, 0.0,
										(right+left)/(right-left), (top_+bottom)/(top_-bottom), -(far+near)/(far-near), -1.0,
										0.0, 0.0, -2.0*far*near/(far-near), 0.0];
	var perspectivelocation = gl.getUniformLocation(this.shaderProgram, "P_persp");
	gl.uniformMatrix4fv(perspectivelocation, false, perspectiveProjectionMatrix);
}
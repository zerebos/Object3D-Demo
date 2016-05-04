//Orri Antonsson

var myShaderProgram;
var gl;
function Initialize() {

	canvas=document.getElementById("gl-canvas");
	gl=WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert( "WebGL is not available" ); }

	gl.viewport( 0, 0, canvas.clientHeight, canvas.clientWidth );
	gl.clearColor( 1.0, 0.0, 0.0, 0.5 );
	gl.enable( gl.DEPTH_TEST );
	
	awkward = new Object3D(gl, ShapeData.Shape1.vertices, ShapeData.Shape1.indexList, null, null, [vec4(1.0,0.0,0.0,1.0), vec4(1.0,1.0,0.0,1.0), vec4(1.0,1.0,1.0,1.0)], null, null);
	awkward.setTranslation(-1, "X");

	
	fish = new Object3D(gl, ShapeData.Shape2.vertices, ShapeData.Shape2.indexList, ShapeData.Shape2.textureCoords, "fish", vec4(0.0,1.0,0.0,1.0), null, null);
	fish.setTranslation(-.6, "Y");
	fish.setRotationLimits(0, null, "Y");
	fish.setRotationForward("Y");
	
	diamond = new Object3D(gl, ShapeData.Shape4.vertices, ShapeData.Shape4.indexList, null, null, ShapeData.Shape4.vertexColors, null, null);
	diamond.setTranslationLimits(-2, 2, "Z");
	diamond.setTranslationDelta(0.01, "Z");
	
	hexdiamond = new Object3D(gl, ShapeData.Shape3.vertices, ShapeData.Shape3.indexList, ShapeData.Shape3.textureCoords, "tex", null, null, null);
	hexdiamond.setScale(0.5);
	hexdiamond.setTranslation(2, "Y");
	
	tetrahedron = new Object3D(gl, ShapeData.Shape5.vertices, ShapeData.Shape5.indexList, null, null, [vec4(1.0,0.0,0.0,1.0),vec4(0.0,1.0,0.0,1.0),vec4(0.0,0.0,1.0,1.0)], null, null);
	tetrahedron.setScale(0.5);
	tetrahedron.setTranslation(-2, "Y");
	
	render();
}

var campos = 0;
var camposdepth = 0;
var camposheight = 0;
var camlookx = 0;
var camlooky = 0;
var fishmonsterheight = -.6;

var defaultCamZoom = 8;

function moveCamKeyboard(event) {
	var keyCode = event.keyCode;
	if (keyCode == 65) {
		campos -= 0.05;
	}
	if (keyCode == 68) {
		campos += 0.05;
	}
	if (keyCode == 38) {
		camposheight += 0.05;
	}
	if (keyCode == 40) {
		camposheight -= 0.05;
	}
	if (keyCode == 87) {
		camposdepth += 0.05;
	}
	if (keyCode == 83) {
		camposdepth -= 0.05;
	}
	if (keyCode == 33) {
		fishmonsterheight += 0.05;
	}
	if (keyCode == 34) {
		fishmonsterheight -= 0.05;
	}
}

function panCamera(event) {
	var canvasx = event.clientX;
	var canvasy = event.clientY;
	
	camlookx = 2*canvasx/canvas.clientWidth - 1;
	camlooky = -(2*canvasy/canvas.clientHeight - 1);
}

function resetCameraPan() {
	camlookx = 0;
	camlooky = 0;
}

function resetCamera() {
	campos = 0;
	camposdepth = 0;
	camposheight = 0;
	camlookx = 0;
	camlooky = 0;
}

function resetScene() {
	resetCamera();
	fishmonsterheight = -.6;
}

function render() {

	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	var eye = vec3(defaultCamZoom*Math.sin(campos) - camposdepth*Math.sin(campos),camposheight,defaultCamZoom*Math.cos(campos) - camposdepth*Math.cos(campos));
	var at = vec3(defaultCamZoom*Math.cos(campos)*camlookx,camlooky,0.0);
	
	fish.setTranslation(fishmonsterheight, "Y");
	
	awkward.Modelview(eye, at);
	fish.Modelview(eye, at);
	diamond.Modelview(eye, at);
	hexdiamond.Modelview(eye, at);
	tetrahedron.Modelview(eye, at);
	
	awkward.render();
	fish.render();
	diamond.render();
	hexdiamond.render();
	tetrahedron.render();
	
	requestAnimFrame(render);
}
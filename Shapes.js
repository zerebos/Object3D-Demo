/*

Created by:
Zack Rauen
Orri Antonsson

*/

// Pyramid
// Fish Monster
// Hexagonal Diamond
// Diamond
// Cube

var ShapeData = {
	Shape1: {
vertices: [
		vec4(0.0, 0.33, 0.33, 1.0),
		vec4(-0.33, 0.0, 0.0, 1.0),
		vec4(0.33, 0.0, 0.0, 1.0),
		vec4(0.0, 0.33, 0.33, 1.0),
		vec4(0.33, 0.0, 0.0, 1.0),
		vec4(0.0, 0.0, 0.66, 1.0),
		vec4(0.0, 0.33, 0.33, 1.0),
		vec4(0.0, 0.0, 0.66, 1.0),
		vec4(-0.33, 0.0, 0.0, 1.0),
		vec4(0.0, 0.33, -0.33, 1.0),
		vec4(0.33, 0.0, 0.0, 1.0),
		vec4(-0.33, 0.0, 0.0, 1.0),
		vec4(0.0, 0.33, -0.33, 1.0),
		vec4(-0.33, 0.0, 0.0, 1.0),
		vec4(0.0, 0.0, 0.66, 1.0),
		vec4(0.0, 0.33, -0.33, 1.0),
		vec4(0.0, 0.0, 0.66, 1.0),
		vec4(0.33, 0.0, 0.0, 1.0)
		],
		
		indexList: [
		0, 1, 2,
		3, 4, 5,
		6, 7, 8,
		9, 10, 11,
		12, 13, 14,
		15, 16, 17,
		]
		
	},
	Shape2: {
		vertices: [
		vec4(.8, 1, .2, 1), vec4(.6, .6, .8, 1), vec4(1.0, .6, 0, 1),
		vec4(.8, 1, .2, 1), vec4(1, .6, 1.2, 1), vec4(.6, .6, 1.2, 1),
		vec4(.8, 1, .2, 1), vec4(.6, .6, 1.2, 1), vec4(.6, .6, .8, 1),
		vec4(.8, 1, .2, 1), vec4(1.0, .6, 0, 1), vec4(1, .6, 1.2, 1),
		vec4(1.0, .6, 0, 1), vec4(.6, .6, .8, 1), vec4(.6, .6, 1.2, 1),
		vec4(1.0, .6, 0, 1), vec4(.6, .6, 1.2, 1), vec4(1, .6, 1.2, 1),
		],
		
		// vertexColors: [
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0)
		// ],
		
		textureCoords: [
		vec2(.5, .5), vec2(.75, 1), vec2(1, .5),
		vec2(0, .5), vec2(.25, 1), vec2(.5, .5),
		vec2(0, .5), vec2(.25, 1), vec2(.5, .5),
		vec2(0, .5), vec2(.25, 1), vec2(.5, .5),
		vec2(.5, .5), vec2(0, .5), vec2(0, 1),
		vec2(.5, .5), vec2(0, 1), vec2(.5, 1),],
		
		indexList: [
		0, 1, 2,
		3, 4, 5,
		6, 7, 8,
		9, 10, 11,
		12, 13, 14,
		15, 16, 17
		]
		
	},
	Shape3: {
		vertices: [
		vec4(0,1,0.75,1), vec4(0,0,1.25,1), vec4(0.43,0,1,1),
		vec4(0,1,0.75,1), vec4(0,0,0.25,1), vec4(-0.43,0,0.5,1),
		vec4(0,1,0.75,1), vec4(0.43,0,1,1), vec4(0.43,0,0.5,1),
		vec4(0,1,0.75,1), vec4(-0.43,0,0.5,1), vec4(-0.43,0,1,1),
		vec4(0,1,0.75,1), vec4(0.43,0,0.5,1), vec4(0,0,0.25,1),
		vec4(0,1,0.75,1), vec4(-0.43,0,1,1), vec4(0,0,1.25,1),
		vec4(0,-1,0.75,1), vec4(0.43,0,1,1), vec4(0,0,1.25,1),
		vec4(0,-1,0.75,1), vec4(-0.43,0,0.5,1), vec4(0,0,0.25,1),
		vec4(0,-1,0.75,1), vec4(0.43,0,0.5,1), vec4(0.43,0,1,1),
		vec4(0,-1,0.75,1), vec4(-0.43,0,1,1), vec4(-0.43,0,0.5,1),
		vec4(0,-1,0.75,1), vec4(0,0,0.25,1), vec4(0.43,0,0.5,1),
		vec4(0,-1,0.75,1), vec4(0,0,1.25,1), vec4(-0.43,0,1,1)
		],
	
		// vertexColors: [
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 1.0, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.9, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.8, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0),
		// vec4( 0.0, 0.0, 0.7, 1.0),
		// vec4( 0.0, 0.0, 0.6, 1.0),
		// vec4( 0.0, 0.0, 0.6, 1.0),
		// vec4( 0.0, 0.0, 0.6, 1.0),
		// vec4( 0.0, 0.0, 0.6, 1.0),
		// vec4( 0.0, 0.0, 0.5, 1.0),
		// vec4( 0.0, 0.0, 0.5, 1.0),
		// vec4( 0.0, 0.0, 0.5, 1.0),
		// vec4( 0.0, 0.0, 0.5, 1.0),
		// vec4( 0.0, 0.0, 0.4, 1.0),
		// vec4( 0.0, 0.0, 0.4, 1.0),
		// vec4( 0.0, 0.0, 0.4, 1.0),
		// vec4( 0.0, 0.0, 0.4, 1.0),
		// vec4( 0.0, 0.0, 0.3, 1.0),
		// vec4( 0.0, 0.0, 0.3, 1.0),
		// vec4( 0.0, 0.0, 0.3, 1.0),
		// vec4( 0.0, 0.0, 0.3, 1.0),
		// vec4( 0.0, 0.0, 0.2, 1.0),
		// vec4( 0.0, 0.0, 0.2, 1.0),
		// vec4( 0.0, 0.0, 0.2, 1.0),
		// vec4( 0.0, 0.0, 0.2, 1.0)
		// ],
	
		textureCoords: [
		vec2(0.25,0.5), vec2(0,0), vec2(0.5,0),
		vec2(0.25,0.5), vec2(0,0), vec2(0.5,0),
		vec2(0.25,0.5), vec2(0,0), vec2(0.5,0),
		vec2(0.25,0.5), vec2(0,0), vec2(0.5,0),
		vec2(0.25,0.5), vec2(0,0), vec2(0.5,0),
		vec2(0.25,0.5), vec2(0,0), vec2(0.5,0),
		vec2(0.25,1), vec2(0,0), vec2(0.5,0),
		vec2(0.25,1), vec2(0,0), vec2(0.5,0),
		vec2(0.25,1), vec2(0,0), vec2(0.5,0),
		vec2(0.25,1), vec2(0,0), vec2(0.5,0),
		vec2(0.25,1), vec2(0,0), vec2(0.5,0),
		vec2(0.25,1), vec2(0,0), vec2(0.5,0)],
	
		indexList: [
		0, 1, 2,
		3, 4, 5,
		6, 7, 8,
		9, 10, 11,
		12, 13, 14,
		15, 16, 17,
		18, 19, 20,
		21, 22, 23,
		24, 25, 26,
		27, 28, 29,
		30, 31, 32,
		33, 34, 35]
		
	},
	Shape4: {
			vertices: [
//front top
			vec4( 0, .3, 0, 1 ),
			vec4( -.25, 0, .25, 1 ),
			vec4( .25, 0, .25, 1 ),
//right top
			vec4( 0, .3, 0, 1 ),
			vec4( .25, 0, .25, 1 ),
			vec4( .25, 0, -.25, 1 ),
//back top
			vec4( 0, .3, 0, 1 ),
			vec4( .25, 0, -.25, 1 ),
			vec4( -.25, 0, -.25, 1 ),
//left top
			vec4( 0, .3, 0, 1 ),
			vec4( -.25, 0, .25, 1 ),
			vec4( -.25, 0, -.25, 1 ),
//front bottom
			vec4( 0, -.3, 0, 1 ),
			vec4( .25, 0, .25, 1 ),
			vec4( -.25, 0, .25, 1 ),
//right bottom
			vec4( 0, -.3, 0, 1 ),
			vec4( .25, 0, -.25, 1 ),
			vec4( .25, 0, .25, 1 ),
//back bottom
			vec4( 0, -.3, 0, 1 ),
			vec4( -.25, 0, -.25, 1 ),
			vec4( .25, 0, -.25, 1 ),
//left bottom
			vec4( 0, -.3, 0, 1 ),
			vec4( -.25, 0, .25, 1 ),
			vec4( -.25, 0, -.25, 1 )],

			vertexColors: [
			vec4( 0.0, 1.0, 0.0, 1.0),
			vec4( 0.0, 1.0, 0.0, 1.0),
			vec4( 0.0, 1.0, 0.0, 1.0),
			vec4( 0.0, 1.0, 0.0, 1.0),
			vec4( 0.0, 0.75, 0.0, 1.0),
			vec4( 0.0, 0.75, 0.0, 1.0),
			vec4( 0.0, 0.75, 0.0, 1.0),
			vec4( 0.0, 0.75, 0.0, 1.0),
			vec4( 0.0, 0.5, 0.0, 1.0),
			vec4( 0.0, 0.5, 0.0, 1.0),
			vec4( 0.0, 0.5, 0.0, 1.0),
			vec4( 0.0, 0.5, 0.0, 1.0),
			vec4( 0.0, 0.25, 0.0, 1.0),
			vec4( 0.0, 0.25, 0.0, 1.0),
			vec4( 0.0, 0.25, 0.0, 1.0),
			vec4( 0.0, 0.25, 0.0, 1.0),
			vec4( 0.25, 0.0, 0.25, 1.0),
			vec4( 0.25, 0.0, 0.25, 1.0),
			vec4( 0.25, 0.0, 0.25, 1.0),
			vec4( 0.25, 0.0, 0.25, 1.0),
			vec4( 0.5, 0.0, 0.5, 1.0),
			vec4( 0.5, 0.0, 0.5, 1.0),
			vec4( 0.5, 0.0, 0.5, 1.0),
			vec4( 0.5, 0.0, 0.5, 1.0)
			],
			
			textureCoords: [ 
//front top			
			1.0, 0.5 ,
			0.0, 0.0 ,
			0.0, 1.0 ,
//front bottom
			1.0, 0.5 ,
			0.0, 1.0 ,
			0.0, 0.0 ,
//left top
			1.0, 0.5 ,
			0.0, 0.0 ,
			0.0, 1.0 ,
//left bottom
			1.0, 0.5 ,
			0.0, 1.0 ,
			0.0, 0.0 ,
//right top
			1.0, 0.5 ,
			0.0, 0.0 ,
			0.0, 1.0 ,
//right bottom
			1.0, 0.5 ,
			0.0, 1.0 ,
			0.0, 0.0 ,
//back top
			1.0, 0.5 ,
			0.0, 0.0 ,
			0.0, 1.0 ,
//back bottom
			1.0, 0.5 ,
			0.0, 1.0 ,
			0.0, 0.0 ],

			indexList: [ 0, 1, 2,
			3, 4, 5,
			6, 7, 8,
			9, 10, 11,
			12, 13, 14,
			15, 16, 17,
			18, 19, 20,
			21, 22, 23]
	},
Shape5: {
		vertices: [
		vec4(0, 0, 0, 1),
		vec4(0, 1, 0, 1),
		vec4(1, 0, 0, 1),
		vec4(0, 0, 0, 1),
		vec4(0, 0, 1, 1),
		vec4(0, 1, 0, 1),
		vec4(0, 0, 0, 1),
		vec4(1, 0, 0, 1),
		vec4(0, 0, 1, 1),
		vec4(1, 0, 0, 1),
		vec4(0, 1, 0, 1),
		vec4(0, 0, 1, 1)
		],
		
		indexList: [
		0, 1, 2,
		3, 4, 5,
		6, 7, 8,
		9, 10, 11
		]
	},
	key: function(n) {
		return this[Object.keys(this)[n-1]];
	}
};

function getFaceNormals( vertices, indexList, numTriangles ) {
	var faceNormals=[];
	for (var i = 0; i < numTriangles; ++i) {
		//gets vertices that make up individual triangles
		var p0 = vec3( vertices[indexList[3*i]][0],vertices[indexList[3*i]][1],vertices[indexList[3*i]][2]);
		var p1 = vec3( vertices[indexList[3*i+1]][0],vertices[indexList[3*i+1]][1],vertices[indexList[3*i+1]][2]);
		var p2 = vec3( vertices[indexList[3*i+2]][0],vertices[indexList[3*i+2]][1],vertices[indexList[3*i+2]][2]);
		var p1minusp0 = vec3(p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2]);
		var p2minusp0 = vec3(p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2]);
		var faceNormal = cross(p1minusp0,p2minusp0);
		faceNormal = normalize(faceNormal);
		faceNormals.push(faceNormal);
	}
	return faceNormals;
}

function getVertexNormals( vertices, indexList, numVertices, numTriangles ) {
	faceNormals = getFaceNormals(vertices,indexList,numTriangles);
	var vertexNormals=[];
	for (var j = 0; j < numVertices; ++j) {
		var vertexNormal = vec3( 0,0,0 );
		for (var i = 0; i < numTriangles; ++i) {
			if (indexList[3*i]==j || indexList[3*i+1] == j || indexList[3*i+2] == j ) {
				vertexNormal[0] = vertexNormal[0] + faceNormals[i][0];
				vertexNormal[1] = vertexNormal[1] + faceNormals[i][1];
				vertexNormal[2] = vertexNormal[2] + faceNormals[i][2];
			}
		}
		vertexNormal = normalize(vertexNormal);
		vertexNormals.push(vertexNormal);
	}
	return vertexNormals;
}
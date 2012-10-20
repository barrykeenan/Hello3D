// Use require js to load classes

// global namespace for our app
window.Hello3D = {};

/**
 * Used to store various textures
 * @type {Object}
 */
Hello3D.MaterialFactory = {

	basicMaterial: function() {
		return new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
	},

	otherMaterial: function() {
		return new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	});
	}
};

/**
 * The app
 * 
 * @type {[type]}
 */
Hello3D.App = {

 	sceneHelpers: null,
 	scene: null,
 	renderer: null,

	camera: null,
 	cubeMesh: null,
 	materials: null,

    initialize: function(materialFactory) {
    	this.materials = materialFactory;

		this.sceneHelpers = new THREE.Scene();
	 	this.scene = new THREE.Scene();

	 	this.render();

	 	this.initCamera();
		this.addSceneHelpers();
		this.addProps();
		this.addLighting();
    },

    initCamera: function(){
    	// set some camera attributes
		var VIEW_ANGLE = 75,
			ASPECT = window.innerWidth / window.innerHeight,
			NEAR = 1,
			FAR = 10000;
    	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    	
    	// the camera starts at 0,0,0 so pull it back
	 	this.camera.position.z = 400;
	 	this.camera.position.y = 300;
	 	this.camera.position.x = 400;

	 	this.camera.lookAt(new THREE.Vector3( 1, 0, 0 ));
    },

    render: function() {
	 	this.renderer = new THREE.WebGLRenderer();
	 	this.renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( this.renderer.domElement );
    },

    addSceneHelpers: function(scene) {
		var size = 500, step = 25;
		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
		var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0x888888 );

		for ( var i = - size; i <= size; i += step ) {

			geometry.vertices.push( new THREE.Vector3( -size, 0, i ) );
			geometry.vertices.push( new THREE.Vector3(  size, 0, i ) );

			geometry.vertices.push( new THREE.Vector3( i, 0, -size ) );
			geometry.vertices.push( new THREE.Vector3( i, 0,  size ) );

			var color = i === 0 ? color1 : color2;

			geometry.colors.push( color, color, color, color );

		}

		var grid = new THREE.Line( geometry, material, THREE.LinePieces );

		this.scene.add( grid );
    },

    addProps: function() {
	 	var cubeGeometry = new THREE.CubeGeometry( 200, 200, 200 );	 	
	 	this.cubeMesh = new THREE.Mesh( cubeGeometry, this.materials.basicMaterial() );
	 	this.scene.add( this.cubeMesh );

	 	// set up the sphere vars
		var radius = 50,
		    segments = 16,
		    rings = 16;

		var sphere1 = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			this.materials.otherMaterial()
		);
		sphere1.position.x = -200;

		this.scene.add(sphere1);
		
		var sphere2 = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			this.materials.otherMaterial()
		);
		sphere2.position.x = 200;

		this.scene.add(sphere2);
    },

    addLighting: function() {
		// create a point light
		var pointLight = new THREE.PointLight(0xFFFFFF);

		// set its position
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		// add to the scene
		this.scene.add(pointLight);
    },

    /**
     * Render loop
     * @return {[type]}
     */
    animate: function() {
	    // note: three.js includes requestAnimationFrame shim
	    requestAnimationFrame( this.animate.bind(this) );

	    // this.cubeMesh.rotation.x += 0.01;
	    // this.cubeMesh.rotation.y += 0.02;

	    this.renderer.render( this.scene, this.camera );
	    // this.renderer.render( this.sceneHelpers, this.camera );
	}
};

var materials = Hello3D.MaterialFactory;

var app = Hello3D.App;
app.initialize(materials);
app.animate();



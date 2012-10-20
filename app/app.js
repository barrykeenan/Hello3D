// Use require js to load classes

// global namespace for our app
window.Hello3D = {};

/**
 * The app
 * 
 * @type {[type]}
 */
Hello3D.App = {

	camera: null,
 	scene: null,
 	renderer: null,

 	cubeMesh: null,

    initialize: function() {
    	// set some camera attributes
		var VIEW_ANGLE = 75,
			ASPECT = window.innerWidth / window.innerHeight,
			NEAR = 1,
			FAR = 10000;
    	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    	
    	// the camera starts at 0,0,0 so pull it back
	 	this.camera.position.z = 1000;

	 	this.scene = new THREE.Scene();

	 	this.renderer = new THREE.WebGLRenderer();
	 	this.renderer.setSize( window.innerWidth, window.innerHeight );
    },

    render: function() {
		document.body.appendChild( this.renderer.domElement );

		return this;
    },

    addProps: function() {
	 	var cubeGeometry = new THREE.CubeGeometry( 200, 200, 200 );
	 	var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	 	this.cubeMesh = new THREE.Mesh( cubeGeometry, material );
	 	this.scene.add( this.cubeMesh );

		// create the sphere's material
		var sphereMaterial = new THREE.MeshLambertMaterial({
      		color: 0xCC0000
    	});

	 	// set up the sphere vars
		var radius = 50,
		    segments = 16,
		    rings = 16;

		// create a new mesh with
		// sphere geometry - we will cover
		// the sphereMaterial next!
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			material
		);

		// add the sphere to the scene
		this.scene.add(sphere);
    },

    animate: function() {
	    // note: three.js includes requestAnimationFrame shim
	    requestAnimationFrame( this.animate.bind(this) );

	    this.cubeMesh.rotation.x += 0.01;
	    this.cubeMesh.rotation.y += 0.02;

	    this.renderer.render( this.scene, this.camera );
	}
};

var app = Hello3D.App;
app.initialize();
app.render();
app.addProps();
app.animate();



// Use require js to load classes



/**
 * Used to store various textures
 * @type {Object}
 */
Hello3D.materialFactory = {

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
Hello3D.app = {

    initialize: function(viewport, materialFactory) {
    	this.viewport = viewport;
    	this.scene = this.viewport.scene;
    	this.materials = materialFactory;

    	this.addProps();

		this.viewport.render();

    	return this;
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
    }
};

var materials = Hello3D.materialFactory;

var viewport = Hello3D.viewport.initialize({
	containerEl: document.body
});

var app = Hello3D.app.initialize(viewport, materials);


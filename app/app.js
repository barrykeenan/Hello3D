// Use require js to load classes

/**
 * Scene with props
 * 
 * @type {[type]}
 */
Hello3D.world = {
	materials: null,
	scene: null,

	initialize: function(materialFactory){
		this.materials = materialFactory;

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

    update: function() {
    	this.cubeMesh.rotation.x += 0.02;
	    this.cubeMesh.rotation.y += 0.04;
    }
	
};

var world = Hello3D.world.initialize(Hello3D.materialFactory);

var viewport = Hello3D.viewport.initialize({
	containerEl: document.body,
	world: world
});


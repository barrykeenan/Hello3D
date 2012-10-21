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

    	this.alpha = 0;
    	this.increasing = true;

		return this;
	},

	addProps: function() {

		this.pivot = new THREE.Object3D();
		this.pivot.position.y = 200;
		this.scene.add( this.pivot );


		var radiusTop = 50,
			radiusBottom = 35,
			height = 200, 
			radiusSegments = 20,
			heightSegments = 2,
			openEnded = false;

	 	this.cylinder = new THREE.Mesh(
	 		new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded),
	 		this.materials.otherMaterial()
	 	);
        this.cylinder.overdraw = true;
        this.cylinder.position.y = -100;
        this.pivot.add(this.cylinder);
    },

    update: function() {

    	// values between -1..0..1
    	// or?
    	// values between 0..1..0

		var speed = 0.01;

		if(this.increasing) {
			if(this.alpha >= 1) {
				this.increasing = false;
			}
			else{
				this.alpha += speed;
			}
		}
		else {
			if(this.alpha <= -1) {
				this.increasing = true;
			}
			else{
				this.alpha -= speed;
			}	
		}
		

		// rotation in radians?
		var rads = this.alpha * (Math.PI/4);

	    this.pivot.rotation.z = rads;
    }
	
};

var world = Hello3D.world.initialize(Hello3D.materialFactory);

var viewport = Hello3D.viewport.initialize({
	containerEl: document.body,
	world: world
});


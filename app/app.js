// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

	// global object for our app
	window.Hello3D = {
		Models: {},
		Controllers: {},
		Views: {}
	};

// Use require js to load classes

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
Hello3D.Views.App = Backbone.View.extend({

 	camera: null,
 	scene: null,
 	renderer: null,
 	geometry: null,
 	material: null,
 	mesh: null,

    initialize: function() {
    	// console.log('initialize');

    	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	 	this.camera.position.z = 1000;

	 	this.scene = new THREE.Scene();

	 	this.geometry = new THREE.CubeGeometry( 200, 200, 200 );
	 	this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	 	this.mesh = new THREE.Mesh( this.geometry, this.material );
	 	this.scene.add( this.mesh );

	 	this.renderer = new THREE.CanvasRenderer();
	 	this.renderer.setSize( window.innerWidth, window.innerHeight );

	 	document.body.appendChild( this.renderer.domElement );
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
		console.log('render');

		

		return this;
    },

    animate: function() {
	    // note: three.js includes requestAnimationFrame shim
	    requestAnimationFrame( this.animate );

	    this.mesh.rotation.x += 0.01;
	    this.mesh.rotation.y += 0.02;

	    this.renderer.render( this.scene, this.camera );
	}
  
});

// Finally, we kick things off by creating the **App**.
var app = new Hello3D.Views.App;
// App.render();
// App.animate();

});
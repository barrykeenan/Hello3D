// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

// global namespace for our app
window.Hello3D = {
	Models: {},
	Controllers: {},
	Views: {}
};

// Use require js to load classes

/**
 * The app
 * 
 * @type {[type]}
 */
Hello3D.Views.App = Backbone.View.extend({

 	camera: null,
 	scene: null,
 	renderer: null,

 	cubeMesh: null,

    initialize: function() {
    	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	 	this.camera.position.z = 1000;

	 	this.scene = new THREE.Scene();

	 	this.renderer = new THREE.CanvasRenderer();
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
    },

    animate: function() {
	    // note: three.js includes requestAnimationFrame shim
	    requestAnimationFrame( this.animate.bind(this) );

	    this.cubeMesh.rotation.x += 0.01;
	    this.cubeMesh.rotation.y += 0.02;

	    this.renderer.render( this.scene, this.camera );
	}
  
});

// Finally, we kick things off by creating the **App**.
var app = new Hello3D.Views.App;
app.render();
app.addProps();
app.animate();

});
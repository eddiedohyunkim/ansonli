let camera, scene, renderer, controls;
let camPC = 1000;
let DisperseCamPC = 1800;
let PyramidCamPC = 2800;
const objects = [];

init();
animate();

// landing page THREEJS images are in "disperse" configuration
transform(disperseConfig(), DisperseCamPC);

// button for THREEJS images "disperse" configuration
document.getElementById('nav_config_1').addEventListener('click', function () { transform(disperseConfig(), DisperseCamPC); }, false);

// button for THREEJS images "pyramid" configuration
document.getElementById('nav_config_2').addEventListener('click', function () { transform(pyramidConfig(), PyramidCamPC); }, false);

// on window resize, resize the THREEJS images 
window.addEventListener('resize', onWindowResize, false);

function init() {
	// json for the THREEJS images
	const url = "https://eddiedohyunkim.github.io/ansonli/sources/content.json"
	fetch(url)
	.then(function(response){return response.json();})
	.then(function(json){build3dElements(json);})
	
	// THREEJS camera
	// x, y, z position of the camera
	camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 1, 10000);
	camera.position.x = camPC;
	camera.position.y = camPC;
	camera.position.z = camPC;
	scene = new THREE.Scene();

	// THREEJS renderer
	// render the entire screen width and height
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);

	// THREEJS user controls
	// camera control max and min distance and movement speed
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.rotateSpeed = 0.5;
	controls.minDistance = -10000;
	controls.maxDistance = 10000;
	controls.addEventListener('change', render);

}// end of init()

// build THREEJS elements that goes in the 'container' div
function build3dElements(json) {

	// for loop for the length of the json file
	for (let i=0; i<json.length; i+=1) {

		// create div as image container 
		let imgContainer = document.createElement('div');
		imgContainer.className =  'all';					

		// create img and append in the image container
		let image = document.createElement('img');
		image.className = 'images';
		image.setAttribute('id','image'+i);
		image.setAttribute('src', json[(json.length-1)-i].source);
		imgContainer.appendChild(image);

		// image container is get appended by THREEJS
		let object = new THREE.CSS3DObject(imgContainer);
		RandomPositionRotation(object)
		scene.add(object);
		objects.push(object);

		// hover over the images and reveal the image category and description in the navigation bar
		imgContainer.addEventListener("mouseover", function(){ 
			document.getElementById('info_'+json[(json.length-1)-i].category).innerHTML = "↳ "+json[(json.length-1)-i].category_name;
			document.getElementById('info_'+json[(json.length-1)-i].category+"_sub").innerHTML = "↳ "+json[(json.length-1)-i].description;
		});

		// remove the image category and description in the navigation bar once mouse leaves
		imgContainer.addEventListener("mouseout", function(){ 
			let allInfo = document.querySelectorAll('.info');
			for(let i=0; i<allInfo.length; i+=1){
				allInfo[i].innerHTML = ''; 
			}
		});
	}	

}// end of build3dElements()

// random positions for the THREEJS images
function RandomPositionRotation(e){

	e.position.x = Math.random() * 600 * (Math.round(Math.random()) ? 1 : -1);
	e.position.y = Math.random() * 600 * (Math.round(Math.random()) ? 1 : -1);
	e.position.z = Math.random() * 600 * (Math.round(Math.random()) ? 1 : -1);
	e.rotation.x = Math.random() * 3;
	e.rotation.y = Math.random() * 3;
	e.rotation.z = Math.random() * 3;

}// end of RandomPositionRotation()

// pyramid configuration for the THREEJS images
function pyramidConfig(){

	let xGap = 250;
	let zGap = 200;
	let pyramidPosition = [];
	let placement = [
		[-xGap/2-xGap,-3],[-xGap/2,-3],[xGap/2,-3],[xGap/2+xGap,-3],
		[-xGap/2-xGap,-2],[-xGap/2,-2],[xGap/2,-2],[xGap/2+xGap,-2],
		[-xGap,-1],[0,-1],[+xGap,-1],
		[-xGap,0],[0,0],[+xGap,0],
		[-xGap/2,1],[xGap/2,1],
		[-xGap/2,2],[xGap/2,2],
		[-xGap/2,3],[xGap/2,3],
		[0,4] 
	];
	for (let i=0; i<objects.length; i+=1) {

		let object = new THREE.Object3D();
		object.position.x = placement[i][0];
		object.position.y = 100;
		object.position.z = placement[i][1]*zGap;
		pyramidPosition.push( object );
		
	}
	console.log(pyramidPosition)
	return pyramidPosition

}// end of pyramidConfig()

// disperse configuration for the THREEJS images - using RandomPositionRotation() above
function disperseConfig(){

	let dispersePosition = [];
	for (let i=0; i<objects.length; i+=1) {

		let object = new THREE.Object3D();
		RandomPositionRotation(object);
		dispersePosition.push(object);

	}
	return dispersePosition

}// end of disperseConfig()

// THREEJS Function - movement of the THREEJS images
// this function deals with the camera movement, THREEJS images positioning, timing and easing of the animation
function transform(targets, cameraDistance){

	TWEEN.removeAll();

	for (let i=0; i<objects.length; i+=1){

		let object = objects[ i ];
		let target = targets[ i ];

		// camera position
		new TWEEN.Tween(camera.position)
			.to( {x:0, y:200, z:cameraDistance}, Math.floor(Math.random()*1500)+1000 )
			.easing(TWEEN.Easing.Quartic.InOut)
			.start();

		// THREEJS images position
		new TWEEN.Tween(object.position)
			.to( {x:target.position.x, y:target.position.y, z:target.position.z}, Math.floor(Math.random()*1500)+1000 )
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();

		// THREEJS images rotation(elements rotate when changing configuration - just for the visual purposes)
		new TWEEN.Tween(object.rotation)
			.to( {x:target.rotation.x, y:target.rotation.y, z:target.rotation.z}, Math.floor(Math.random()*1500)+1000 )
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
	}
	
	new TWEEN.Tween(this)
		.to({}, 1800)
		.onUpdate(render)
		.start();

}// end of transform()

// THREEJS Function - on window resize, update the camera aspect and rendering size of the page. 
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();

}

// THREEJS Function - animation for the transform() above
function animate() {

	requestAnimationFrame(animate);
	TWEEN.update();
	controls.update();

}

// THREEJS Function - rendering the THREEJS images and camera
function render() {

	renderer.render(scene, camera);

}
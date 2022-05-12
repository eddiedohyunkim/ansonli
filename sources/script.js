// var stats;
let camera, scene, renderer, controls;
let camPC = 1000;
let DisperseCamPC = 1800;
let PyramidCamPC = 2800;
// let moCamDis = 3000;
// let moCamDisperseDis = 4000;
// let moCamPyramidDis = 6000;
const objects = [];

init();
animate();

// starting page
transform(disperseConfig(), DisperseCamPC);

document.getElementById('nav_config_1').addEventListener('click', function () { transform(disperseConfig(), DisperseCamPC); }, false);

document.getElementById('nav_config_2').addEventListener('click', function () { transform(pyramidConfig(), PyramidCamPC); }, false);
window.addEventListener( 'resize', onWindowResize, false );

function init() {
	const url = "https://eddiedohyunkim.github.io/ansonli/sources/content.json"
	fetch(url)
	.then(function(response){return response.json();})
	.then(function(json){buildElements(json);})
	
	// threejs camera
	camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 1, 10000);
	camera.position.x = camPC;
	camera.position.y = camPC;
	camera.position.z = camPC;
	scene = new THREE.Scene();	

	// threejs renderer
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);

	// threejs user controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.rotateSpeed = 0.5;
	controls.minDistance = -10000;
	controls.maxDistance = 10000;
	controls.addEventListener('change', render);

}// end of init()

function buildElements(json) {
	for (let i=0; i<json.length; i+=1) {
		let imgContainer = document.createElement('div');
		imgContainer.className =  'all';					

		let image = document.createElement('img');
		image.className = 'images';
		image.setAttribute('id','image'+i);
		image.setAttribute('src', json[(json.length-1)-i].source);
		imgContainer.appendChild(image);

		

		let object = new THREE.CSS3DObject(imgContainer);
		RandomPositionRotation(object)
		scene.add(object);
		objects.push(object);

		// let cat = 
		imgContainer.addEventListener("mouseover", function(){ 
			document.getElementById('info_'+json[(json.length-1)-i].category).innerHTML = "↳ "+json[(json.length-1)-i].category_name;
			document.getElementById('info_'+json[(json.length-1)-i].category+"_sub").innerHTML = "↳ "+json[(json.length-1)-i].description;

		});

		imgContainer.addEventListener("mouseout", function(){ 
			// document.getElementById('info_cont').innerHTML = '';
			let allInfo = document.querySelectorAll('.info');
			for(let i=0; i<allInfo.length; i+=1){
				allInfo[i].innerHTML = ''; 
			}
			
		});
	}	


}// end of buildElements()

function RandomPositionRotation(e){
	e.position.x = Math.random() * 600 * (Math.round(Math.random()) ? 1 : -1);
	e.position.y = Math.random() * 600 * (Math.round(Math.random()) ? 1 : -1);
	e.position.z = Math.random() * 600 * (Math.round(Math.random()) ? 1 : -1);
	e.rotation.x = Math.random() * 3;
	e.rotation.y = Math.random() * 3;
	e.rotation.z = Math.random() * 3;
}// end of RandomPositionRotation()

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

function disperseConfig(){
	let dispersePosition = [];
	for (let i=0; i<objects.length; i+=1) {
		let object = new THREE.Object3D();
		RandomPositionRotation(object);
		dispersePosition.push(object);
	}
	return dispersePosition
}// end of disperseConfig()

function transform(targets, cameraDistance){
	TWEEN.removeAll();
	for (let i=0; i<objects.length; i+=1){
		let object = objects[ i ];
		let target = targets[ i ];

		new TWEEN.Tween(camera.position)
			.to( {x:0, y:200, z:cameraDistance}, Math.floor(Math.random()*1500)+1000 )
			.easing(TWEEN.Easing.Quartic.InOut)
			.start();

		new TWEEN.Tween(object.position)
			.to( {x:target.position.x, y:target.position.y, z:target.position.z}, Math.floor(Math.random()*1500)+1000 )
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
		
		new TWEEN.Tween( object.rotation )
			.to( {x:target.rotation.x, y:target.rotation.y, z:target.rotation.z}, Math.floor(Math.random()*1500)+1000 )
			.easing(TWEEN.Easing.Exponential.InOut)
			.start();
	}
	
	new TWEEN.Tween(this)
		.to({}, 1800)
		.onUpdate(render)
		.start();

}// end of transform()


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}

window.addEventListener('click', function(){
	document.getElementById('image20').setAttribute('src', 'assets/1_Collection_Video/thumbnail_2.png');

})
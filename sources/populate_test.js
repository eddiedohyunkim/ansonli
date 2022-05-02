let parsed = [];
const imgUrl = "https://eddiedohyunkim.github.io/ansonli/sources/populate_test.json"
	fetch(imgUrl)
	.then(function(response){return response.json();})
	.then(function(json){parsed=json})

let home_btn = document.getElementById('nav_title');
home_btn.addEventListener('click', ContClose, false);

// nav bar number button 1
let num_1_btn = document.getElementById('nav_num_1');
num_1_btn.addEventListener('click', vidPopUp, false);
num_1_btn.parameter = '1';

// nav bar number button 2
let num_2_btn = document.getElementById('nav_num_2');
num_2_btn.addEventListener('click', imgPopUp, false);
num_2_btn.parameter = '2';

// nav bar number button 3
let num_3_btn = document.getElementById('nav_num_3');
num_3_btn.addEventListener('click', imgPopUp, false);
num_3_btn.parameter = '3';

// nav bar number button 4
let num_4_btn = document.getElementById('nav_num_4');
num_4_btn.addEventListener('click', imgPopUp, false);
num_4_btn.parameter = '4';



function ContClose(){
	let getImgCont = document.getElementById('imageContainer');
	if(Boolean(getImgCont)){ getImgCont.remove();}
	let getVidCont = document.getElementById('videoContainer');
	if(Boolean(getVidCont)){ getVidCont.remove();}
}

function vidPopUp(e){
	let parameter = e.currentTarget.parameter
	makeVidCont();
	populateVid(parameter);
}

function imgPopUp(e){
	let parameter = e.currentTarget.parameter
	makeImgCont();
	populateImg(parameter);
}

function makeVidCont(){
	ContClose()
	let createCont = document.createElement('div');
	createCont.setAttribute('id', 'videoContainer');
	document.body.appendChild(createCont);
	let videoHolder = document.createElement('div');
	videoHolder.setAttribute('id', 'videoHolder');
	document.getElementById('videoContainer').appendChild(videoHolder);
}

function makeImgCont(){
	ContClose()
	let createCont = document.createElement('div');
	createCont.setAttribute('id', 'imageContainer');
	document.body.appendChild(createCont);
}

function populateVid(number){
	let video = document.createElement('video');
	video.setAttribute('id', 'video');
	video.src = 'https://eddiedohyunkim.github.io/ansonli/assets/1_Collection_Video/In_Situ-_Collection_Intro.mp4';
	video.autoplay = true;
	video.muted = true;
	document.getElementById('videoHolder').appendChild(video);
	video.addEventListener('ended',ContClose,false);
}

function populateImg(number){
	console.log(number);
	let format;
	let source = parsed[number-2].source
	// console.log(parsed[number-2].id);
	for(let i=0; i<source.length; i+=1){
		let box = document.createElement('div');
		box.setAttribute('id', 'box'+i);
		box.setAttribute('class', 'boxes');
		document.getElementById('imageContainer').appendChild(box);
	}
	for(let i=0; i<source.length; i+=1){
		let image = document.createElement('img');
		image.setAttribute('src', source[i]);
		image.setAttribute('class', 'popImages');
		document.getElementById('box'+i).appendChild(image);
	}

	// if(number==2){
	// 	format='jpg';
	// }else{
	// 	format='jpeg';
	// }
	// for(let i=0; i<21; i+=1){
	// 	let box = document.createElement('div');
	// 	box.setAttribute('id', 'box'+i);
	// 	box.setAttribute('class', 'boxes');
	// 	document.getElementById('imageContainer').appendChild(box);
	// }
	// for(let i=0; i<21; i+=1){
	// 	let image = document.createElement('img');
	// 	image.setAttribute('src', `assets/image/${number}/test_c${number}_${i}.${format}`);
	// 	// image.setAttribute('id', 'image'+i);
	// 	image.setAttribute('class', 'popImages');
	// 	document.getElementById('box'+i).appendChild(image);	
	// }
}
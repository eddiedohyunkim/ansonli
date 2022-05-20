// This script deals with all the extra "pop up" divs that can be initiated from the navigation bar

let parsed = [];
// JSON that contains all the videos and images that get populated when clicking "1", "2", "3", "4" buttons in the navigation bar
const imgUrl = "https://eddiedohyunkim.github.io/ansonli/sources/populate.json"
	fetch(imgUrl)
	.then(function(response){return response.json();})
	.then(function(json){parsed=json})

let home_btn = document.getElementById('nav_title');
home_btn.addEventListener('click', ContClose, false);

// EventListener for the "1" button in the navigation bar
// Clicking "1" loads a video
let num_1_btn = document.getElementById('nav_num_1');
num_1_btn.addEventListener('click', vidPopUp, false);
num_1_btn.parameter = '1';

// EventListener for the "2" button in the navigation bar
// Clicking "2" loads "category 2" images 
let num_2_btn = document.getElementById('nav_num_2');
num_2_btn.addEventListener('click', imgPopUp, false);
num_2_btn.parameter = '2';

// EventListener for the "3" button in the navigation bar
// Clicking "3" loads "category 3" images
let num_3_btn = document.getElementById('nav_num_3');
num_3_btn.addEventListener('click', imgPopUp, false);
num_3_btn.parameter = '3';

// EventListener for the "4" button in the navigation bar
// Clicking "4" loads "category 4" images
let num_4_btn = document.getElementById('nav_num_4');
num_4_btn.addEventListener('click', imgPopUp, false);
num_4_btn.parameter = '4';


// When user clicks either "1", "2", "3", "4" button and later other number button, REMOVE <div id = 'imageContainer'> that contains the previous images of the category and create a NEW <div id = 'imageContainer'> that contains images of new category
function ContClose(){
	let getImgCont = document.getElementById('imageContainer');
	if(Boolean(getImgCont)){ getImgCont.remove();}
	let getVidCont = document.getElementById('videoContainer');
	if(Boolean(getVidCont)){ getVidCont.remove();}
}


// creates a <video> when "1" button is clicked
function vidPopUp(e){
	let parameter = e.currentTarget.parameter
	makeVidCont();
	populateVid(parameter);
}

// creates <img>s when either "2", "3", "4" button is clicked
function imgPopUp(e){
	let parameter = e.currentTarget.parameter
	makeImgCont();
	populateImg(parameter);
}

// creates a parent <div> for the <video>
function makeVidCont(){
	ContClose()
	let createCont = document.createElement('div');
	createCont.setAttribute('id', 'videoContainer');
	document.body.appendChild(createCont);
	let videoHolder = document.createElement('div');
	videoHolder.setAttribute('id', 'videoHolder');
	document.getElementById('videoContainer').appendChild(videoHolder);
}

// creates a parent <div> for the <img>s
function makeImgCont(){
	ContClose()
	let createCont = document.createElement('div');
	createCont.setAttribute('id', 'imageContainer');
	document.body.appendChild(createCont);
}

// creates a <video> that autoplays with no control. <video> is removed when the video ends.
function populateVid(number){
	let video = document.createElement('video');
	video.setAttribute('id', 'video');
	video.src = 'https://eddiedohyunkim.github.io/ansonli/assets/1_Collection_Video/In_Situ-_Collection_Intro.mp4';
	video.autoplay = true;
	video.muted = true;
	document.getElementById('videoHolder').appendChild(video);
	video.addEventListener('ended',ContClose,false);
}

// // creates parent <div>s and <img>s with the img src pulled from the JSON. 
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
}
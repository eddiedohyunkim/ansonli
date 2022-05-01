
// nav bar number button 1
let num_1_btn = document.getElementById('nav_num_1');
num_1_btn.addEventListener('click', initiate, false);
num_1_btn.parameter = '1';

// nav bar number button 2
let num_2_btn = document.getElementById('nav_num_2');
num_2_btn.addEventListener('click', initiate, false);
num_2_btn.parameter = '2';

// nav bar number button 3
let num_3_btn = document.getElementById('nav_num_3');
num_3_btn.addEventListener('click', initiate, false);
num_3_btn.parameter = '3';

// nav bar number button 4
let num_4_btn = document.getElementById('nav_num_4');
num_4_btn.addEventListener('click', initiate, false);
num_4_btn.parameter = '4';


// function initiate(e){
// 	window.alert(e.currentTarget.parameter);
// }


function initiate(e){
	let parameter = e.currentTarget.parameter
	// disable(parameter);
	closeBtn();
	makeImgCont();
	setColumn();
	populate(parameter);
}

function disable(number){
	let numbers = [1,2,3,4];
	numbers.splice(number-1, 1);
	for(const element of numbers){
		document.getElementById(`nav_num_${element}`).removeEventListener('click', initiate, false);
	}
}
// function del(){
// 	document.getElementById('imageContainer').remove();
// }
function closeBtn(){
	// document.getElementById('nav_cont').style.display = 'none';
}

function makeImgCont(){

	var get = document.getElementById('imageContainer');
	if(Boolean(get)){ get.remove();}
	var createCont = document.createElement('div');
	createCont.setAttribute('id', 'imageContainer');
	document.body.appendChild(createCont);
	
}

window.addEventListener("resize", setColumn);
var WorH;
var size;
var columnNumber;
var categoryGap;

function setColumn(){
	var width = document.body.clientWidth;
	console.log(width);
	if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		function detectOrientation(){
			if(typeof window.onorientationchange != 'undefined'){
				if(window.orientation==0){
					columnNumber = 2;
				}else if(window.orientation==90 || window.orientation==-90){
					columnNumber = 3;
				} // fi
			}
		} 
		detectOrientation();
		window.onorientationchange = detectOrientation;
	}else if(/iPad/i.test(navigator.userAgent)){
		function detectOrientation(){
			if(typeof window.onorientationchange != 'undefined'){
				if(window.orientation==0){ 
					columnNumber = 4;
				}else if(window.orientation==90 || window.orientation==-90){
					columnNumber = 4;
				} // fi
			}
		} 
		detectOrientation();
		window.onorientationchange = detectOrientation;
	}else if(width<600){
		columnNumber = 2;
	}else if(width<900){
		columnNumber = 3;
	}else if(width<1200){
		columnNumber = 4;
	}else{
		columnNumber = 5;
	}
	document.getElementById('imageContainer').style.gridTemplateColumns = `repeat(${columnNumber},1fr)`;
}

function populate(number){
	let format;
	if(number==2){
		format='jpg';
	}else{
		format='jpeg';
	}
	for(var i=0; i<21; i+=1){
		var box = document.createElement('div');
		box.setAttribute('id', 'box'+i);
		box.setAttribute('class', 'boxes');
		document.getElementById('imageContainer').appendChild(box);
	}
	for(var i=0; i<21; i+=1){
		var image = document.createElement('img');
		image.setAttribute('src', `assets/image/${number}/test_c${number}_${i}.${format}`);
		// image.setAttribute('id', 'image'+i);
		image.setAttribute('class', 'popImages');
		document.getElementById('box'+i).appendChild(image);	
	}
}
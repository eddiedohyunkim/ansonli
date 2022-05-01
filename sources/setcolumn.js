document.getElementById('pop').addEventListener("click", initiate);
document.getElementById('remove').addEventListener("click", del);

function initiate(e){
	var createCont = document.createElement('div');
	createCont.setAttribute('id', 'imageContainer');
	document.body.appendChild(createCont);
	setColumn();
	populate();
}

function del(){
	document.getElementById('imageContainer').remove();
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
					WorH = 'width:100%;';
					size = 2;
				}else if(window.orientation==90 || window.orientation==-90){
					columnNumber = 3;
					WorH = 'height:100%;';
					size = 1;
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
					WorH = 'height:90%;';
					size = 1;
				}else if(window.orientation==90 || window.orientation==-90){
					columnNumber = 4;
					WorH = 'height:100%;';
					size = 1;
				} // fi
			}
		} 
		detectOrientation();
		window.onorientationchange = detectOrientation;
	}else if(width<600){
		columnNumber = 2;
		WorH = 'width:100%;';
		size = 1;
	}else if(width<900){
		columnNumber = 3;
		WorH = 'height:100vh;';
		size = 1;
	}else if(width<1200){
		columnNumber = 4;
		WorH = 'height:100vh;';
		size = 1;
	}else{
		columnNumber = 5;
		WorH = 'height:100vh;';
		size = 1;
	}
	document.getElementById('imageContainer').style.gridTemplateColumns = `repeat(${columnNumber},1fr)`;
}
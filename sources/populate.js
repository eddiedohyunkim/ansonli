function populate(){
	for(var i=0; i<98; i+=1){
		var box = document.createElement('div');
		box.setAttribute('id', 'box'+i);
		box.setAttribute('class', 'boxes');
		document.getElementById('imageContainer').appendChild(box);
	}
	for(var i=0; i<98; i+=1){
		var image = document.createElement('img');
		image.setAttribute('src', `assets/image/helmutlang/helmutlangall/${i}.jpeg`);
		image.setAttribute('id', 'image'+i);
		image.setAttribute('class', 'images');
		document.getElementById('box'+i).appendChild(image);	
	}
}
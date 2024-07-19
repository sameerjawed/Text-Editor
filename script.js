function addTextBox() {
	const newTextBox = document.createElement('div');
	newTextBox.className = 'draggable zoomable';
	newTextBox.contentEditable = true;
	newTextBox.innerHTML = 'Click to edit text...';
	newTextBox.style.left = '100px';
	newTextBox.style.top = '100px';

	newTextBox.addEventListener('mousedown', dragMouseDown);
	newTextBox.addEventListener('wheel', zoomTextBox);

	document.getElementById('content').appendChild(newTextBox);
}

function dragMouseDown(e) {
	e.preventDefault();
	const element = e.target;
	let shiftX = e.clientX - element.getBoundingClientRect().left;
	let shiftY = e.clientY - element.getBoundingClientRect().top;

	function moveAt(clientX, clientY) {
			element.style.left = clientX - shiftX + 'px';
			element.style.top = clientY - shiftY + 'px';
	}

	function onMouseMove(e) {
			moveAt(e.clientX, e.clientY);
	}

	document.addEventListener('mousemove', onMouseMove);

	document.addEventListener('mouseup', function () {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', this);
	});
}

function zoomTextBox(e) {
	e.preventDefault();
	const element = e.target;
	const scale = Math.exp(e.deltaY / 100);
	const currentTransform = getComputedStyle(element).transform;
	const currentScale = currentTransform === 'none' ? 1 : parseFloat(currentTransform.split('(')[1].split(')')[0].split(',')[0]);
	element.style.transform = `scale(${currentScale * scale})`;
}

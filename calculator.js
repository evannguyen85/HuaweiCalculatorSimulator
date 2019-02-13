var resultEle = document.getElementById("result");
var equationEle = document.getElementById("equation");

function add(a, b, e) {
	if (e.target !== e.currentTarget) {
		var clickedItem = e.target.id;
		var clickedValue = e.target.innerText;
		console.log(e);

		equationEle.innerHTML += clickedValue;
		if (clickedItem === 'minus' || e.target.className === 'fas fa-minus') {
			equationEle.innerHTML += ' - ';
		}
	}
	return a + b;
}

var firstKeyRowEle = document.getElementById("key789m");
firstKeyRowEle.addEventListener("click", function(e){
	add(5, 6, e);
}, false);
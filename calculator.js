function add(a, b, e) {
	if (e.target !== e.currentTarget) {
		var clickedItem = e.target.id;
		console.log("clicked item: ");
		console.log(clickedItem);
		console.log("clicked item 2: ", clickedItem);
	}
	return a + b;
}



var a = 5, b=10;
var resultEle = document.getElementById("result");
var equationEle = document.getElementById("equation");
equationEle.innerHTML = a + " + " + b;

var firstKeyRowEle = document.getElementById("key789m");
firstKeyRowEle.addEventListener("click", function(e){
	add(5, 6, e);
}, false)
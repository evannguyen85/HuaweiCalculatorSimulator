var equationEle = document.getElementById("equation");
var resultEle = document.getElementById("result");
var keyHistories = [];

function displayEnteredKeys(e) {
	console.log(e);
	var target = e.target;

	if (e.target.localName == 'i') {
		target = e.target.parentNode;
		console.log(e.target);
	}
	var key = target.dataset.id;

	switch(key) {
		case 'c':
			console.log("clicked C");
			clear();
			break;
		case 'b':
			console.log("clicked b");
			backSpace();
			printResult();
			break;
		case 'e':
			console.log("clicked e");
			calc();
			break;
		default:
			equationEle.innerHTML += key;
			printResult();
			keyHistories.push(key);
	}
}

// function displayEnteredKeys(e){
// 	console.log(e);
// 	console.log(e.target.dataset.id);
// }

//when clicking equal sign to calculate
function calc() {
	let enteredNum = equationEle.innerHTML;
	console.log(enteredNum);
	let units = enteredNum.split(' ');
	console.log(units);

	if (!units[2]) {
		return + "NaN";
	}
	let a = +units[0];
	let operator = units[1];
	let b = +units[2];
	
	let result = execute(a,b,operator);

	console.log(result);

	//resultEle.innerHTML = result;

	return result;
}

function execute(a,b,operator) {
	switch(operator) {
		case '+':
			return a + b;
		case '-':	
			return a - b;
		case '/':
			return a / b;
		case '*':
			return a * b;
		//%
	}
}

// var equal = document.getElementById("equal");
// equal.addEventListener("click", calc, false);


// var firstKeyRowEle = document.getElementById("key789m");
// firstKeyRowEle.addEventListener("click", displayEnteredKeys, false);

// var clear = document.getElementById("clear");
// clear.addEventListener("click", function(){
// 	equationEle.innerHTML = "";
// 	resultEle.innerHTML = "";
// }, false);

var keypads = document.getElementsByClassName("keypad");
for (var i = keypads.length - 1; i >= 0; i--) {
	keypads[i].addEventListener("click", displayEnteredKeys, false);
}

function clear(){
	equationEle.innerHTML = "";
	resultEle.innerHTML = "";
}

function backSpace() {
	keyHistories.pop();
	clear();
	for (var i = 0; i < keyHistories.length; i++) {
		equationEle.innerHTML += keyHistories[i];
	}
}

function printResult(){
	let reslt = calc();
	if (!isNaN(reslt)) {
		resultEle.innerHTML = calc();
	}
}
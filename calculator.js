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
			//console.log("clicked b");
			keyHistories.pop();
			showEquation();
			printResult();
			break;
		case 'e':
			//console.log("clicked e");
			printResult();
			break;
		default:
			console.log(equationEle.innerHTML);
			let len = keyHistories.length;

			//do not display the first key - not a number.
			//except for - as used for negative number

			if (len ==0 && (key.trim() == '-') ) {
				keyHistories[0] = key.trim();
				showEquation();
			}

			else if (len == 0 && isNaN(key) && !(key.trim() == '-')) {
				clear();
			}

			else if (len > 0 && isNaN(key) && isNaN(keyHistories[len-1])) {
				keyHistories[len-1] = key;
				console.log(keyHistories);
				showEquation();
			}
			else {
				keyHistories.push(key);	
				showEquation();
			}
			printResult();
	}
}

function printResult(){
	let reslt = calc();
	if (!isNaN(reslt)) {
		resultEle.innerHTML = calc();
	}
}

function calc() {
	let enteredNum = equationEle.innerHTML;
	let units = enteredNum.split(' ');
	
	var operator = units[1];
	var a = +units[0];
	var b = +units[2];

	if (!units[2] && units[1] != '%') {
		return + "NaN";
	}

	if (operator == '%' && b == 0) {
		return execute(a,1,operator);
	}
	return execute(a,b,operator);
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
		case '%':
			return (a / 100) * b;
	}
}

var keypads = document.getElementsByClassName("keypad");
for (var i = keypads.length - 1; i >= 0; i--) {
	let len = keyHistories.length;
	keypads[i].addEventListener("click", displayEnteredKeys, false);
}

function clear(){
	equationEle.innerHTML = "";
	resultEle.innerHTML = "";
	keyHistories = [];
}

function showEquation() {
	equationEle.innerHTML = "";
	resultEle.innerHTML = "";
	for (var i = 0; i < keyHistories.length; i++) {
		equationEle.innerHTML += keyHistories[i];
	}
}


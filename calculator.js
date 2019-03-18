var equationEle = document.getElementById("equation");
var resultEle = document.getElementById("result");
var keyHistories = [];

function displayEnteredKeys(e) {
	//console.log(e);
	var target = e.target;

	if (e.target.localName == 'i') {
		target = e.target.parentNode;
		//console.log(e.target);
	}
	var key = target.dataset.id.trim();
	var len = keyHistories.length;
	switch (key) {
		case 'c':
			//console.log("clicked C");
			clear();
			break;
		case 'b':
			//console.log("clicked b");
			if (len > 0) {
				keyHistories.pop();
				showEquation();
				printResult();
			}
			else {
				clear();
			}
			break;
		case 'e':
			//console.log("clicked e");
			equationEle.innerHTML = "";
			resultEle.className += " final-result";
			if (len > 0) {
				printResult();
				keyHistories = [];
			}

			break;

		default:
			//do not display the first key - not a number.
			//except for - as used for negative number

			//for negative number
			if (len == 0 && (key == '-')) {
				keyHistories[0] = key;
				showEquation();
			}
			//dont accept the first key as operator (except for -), or first key as 0
			else if ((len == 0 && isNaN(key) && !(key == '-')) || (len == 0 && key == '0')) {
				clear();
			}
			//dont accept two consecutive keys as operators, except for ()
			else if (len > 0 && isNaN(key) && isNaN(keyHistories[len - 1]) && keyHistories[len - 1] != '%' && keyHistories[len - 1] != ')') {
				keyHistories[len - 1] = key;
				//console.log(keyHistories);
				showEquation();
			}
			else { //including x^2 happy path. Will handle corner case.
				keyHistories.push(key);
				showEquation();
			}
			printResult();
	}
}

function printResult() {
	resultEle.getElementsByTagName("span")[0].innerHTML = calc();
}

function calc() {
	//will need to handle long equation	
	var output = "";
	var len = keyHistories.length;
	output = evaluate(keyHistories);


	if (len <= 0) { return ""; }
	try {
		var result = eval(output);
		if (result == 'Infinity') {
			return "error";
		}
		if (!isNaN(result)) {
			return result;
		}
	}
	catch (e) {
		console.log("error message: " + e.name);
		return "error";
	}
}

var keypads = document.getElementsByClassName("keypad");
for (var i = keypads.length - 1; i >= 0; i--) {
	let len = keyHistories.length;
	keypads[i].addEventListener("click", displayEnteredKeys, false);
}

function clear() {
	equationEle.innerHTML = "";
	resultEle.querySelector("span").innerHTML = "";
	resultEle.className = "col in-out-panel";
	keyHistories = [];
}

function showEquation() {
	equationEle.innerHTML = "";
	resultEle.querySelector("span").innerHTML = "";
	let len = keyHistories.length;
	for (let i = 0; i < len - 1; i++) {
		equationEle.innerHTML += keyHistories[i] + ' ';
	}
	equationEle.innerHTML += keyHistories[len - 1]; // will need to take care of '(' and ')'
}

function power(base, exponent) {
	if (exponent === 0) {
		return 1;
	} else {
		return base * power(base, exponent - 1);
	}
}

function evaluate(keys) {
	const keyStr = keys.join('');
	let found = keyStr.replace(/(\^)(\()(\d)\)/g, '**$3');
	// console.log(found);
	if (found.match(/\%\d/g)) {
		return found.replace(/(\%)(\d)/g, '*0.01*$2');
	} else if (found.match(/\%/g)) {
		return found.replace(/\%/g, '*0.01');
	}
	return found;
}







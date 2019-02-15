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
	var key = target.dataset.id;
	var len = keyHistories.length;
	switch(key) {
		case 'c':
			//console.log("clicked C");
			clear();
			break;
		case 'b':
			//console.log("clicked b");
			if (len>0) {
				keyHistories.pop();
				showEquation();
				printResult();	
			}
			
			break;
		case 'e':
			//console.log("clicked e");
			if (len>0) {
				printResult();	
			}
			
			break;
		default:
			//console.log(equationEle.innerHTML);
			

			//do not display the first key - not a number.
			//except for - as used for negative number

			//for negative number
			if (len ==0 && (key.trim() == '-') ) {
				keyHistories[0] = key.trim();
				showEquation();
			}
			//dont accept the first key as operator (except for -), or first key as 0
			else if ((len == 0 && isNaN(key) && !(key.trim() == '-')) || (len == 0 && key.trim() == '0' )) {
				clear();
			}
			//dont accept two consecutive keys as operators.
			else if (len > 0 && isNaN(key) && isNaN(keyHistories[len-1]) && keyHistories[len-1].trim() != '%' ) {
				keyHistories[len-1] = key;
				//console.log(keyHistories);
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
	//let reslt = calc();
	//if (!isNaN(reslt)) {
		resultEle.innerHTML = calc();
	//}
}

function calc() {
	//will need to handle long equation
	//let enteredNum = equationEle.innerHTML;
	//let units = enteredNum.split(' ');
	var output = "";
	var len = keyHistories.length;
	if (len <= 0) { return "";}
	for (var i = 0; i < len-1; i++) {

		if(keyHistories[i].trim()=='%' && !isNaN(keyHistories[i+1].trim())) {
			output += "*0.01*";
		}
		else if (keyHistories[i].trim()=='%' && isNaN(keyHistories[i+1].trim())) {
			output += "*0.01";
		}
		else {
			output += keyHistories[i].trim();	
		}
	}

	if (!isNaN(keyHistories[len-1].trim())) {
		output += keyHistories[len-1].trim();
		//console.log(keyHistories[len-1]);
	}
	if (keyHistories[len-1].trim() == '%') {
		output += "*0.01";
	}

	//console.log(output);
	//console.log(eval(output));
	//console.log(keyHistories);
	
	// var operator = units[1];
	// var a = +units[0];
	// var b = +units[2];

	// if (!units[2] && units[1] != '%') {
	// 	return + "NaN";
	// }

	// if (operator == '%' && b == 0) {
	// 	return execute(a,1,operator);
	// }
	//return execute(a,b,operator);

	//do not show result when just the first number
	if (!isNaN(output)) { 
		return "";
	}

	try {
		var result = eval(output);
		if (result == 'Infinity') {
			return "error";
		}
		if (!isNaN(result)) {
			return result;			
		}
		
	}
	catch(e) {
		console.log("error message: " + e.name);
		return "error";
	}

	
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

// var input = "9-2/2*3+4-3*6/2";
// console.log(eval(input));
















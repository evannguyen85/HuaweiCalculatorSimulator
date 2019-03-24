var equationEle = document.getElementById("equation");
var resultEle = document.getElementById("result");
var keyHistories = [];
var degree = true; // true if degree, and false if radian
var storedValue = 0; // to store value in memory register;
var result = 0;
var mem = document.getElementById('memory');
var finalResult = resultEle.getElementsByTagName("span")[0];

var keypads = document.getElementsByClassName("keypad");
for (var i = keypads.length - 1; i >= 0; i--) {
	keypads[i].addEventListener("click", function (event) {
		displayEnteredKeys(event);
	}, false);
}

document.addEventListener('keyup', function (event) {
	displayEnteredKeys(event);
}, false);

function displayEnteredKeys(e) {
	// console.log(e);
	var key = '';
	if (e.type === 'click') {
		var target = e.target;
		if (e.target.localName == 'i') {
			target = e.target.parentNode;
		}
		key = target.dataset.id.trim();
	} else if (e.type === 'keyup') {
		key = e.key;
	} else {
		console.log('Undefined event')
	}

	// Once user clicked equal button, the final result is displayed, and user click the first key for the next calc
	// clear is needed.
	if (resultEle.classList.contains('final-result') && !isNaN(key)) {
		clear();
	}


	if (key === 'Shift') {
		return;
	}

	var len = keyHistories.length;
	var lastKey = keyHistories[len - 1];
	var keyFlag = checkOperator(key);
	var lastKeyFlag = checkOperator(lastKey);

	switch (true) {
		// for negative number
		case len == 0 && key == '-':
			keyHistories[0] = key;
			showEquation();
			break;
		// doesnt accept first key as + * / and 0
		case (len == 0 && !(key == '-') && keyFlag):
			clear();
			break;

		// doesnt accept two consecutive keys as operators.
		case len > 0 && lastKeyFlag && keyFlag:
			lastKey = key;
			showEquation();
			printResult();
			break;

		// keys as numbers
		case !isNaN(key) || keyFlag || key === ')' || key === '(' || key === '^(2)' || key === '^(3)' || key === '^(' || key === '!' || key === '%' || key === '.':
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'Escape':
			clear();
			break;

		case key === 'Backspace':
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

		case key === '=' || key === 'Enter':
			if (finalResult.innerHTML === 'error') {
				break;
			}
			equationEle.style.transition = '0.5s';
			equationEle.className += ' equation-flyout';
			resultEle.style.transition = '0.5s';
			resultEle.className += ' final-result';
			if (len > 0) {
				printResult();
				keyHistories = [];
				keyHistories.push(result);
			}
			break;

		case key === 'm+':
			storeValue(true);
			break;

		case key === 'm-':
			storeValue(false);
			break;

		case key === 'mr':
			if (mem.innerHTML != '') {
				recallMemory();
			}
			break;

		case key === 'mc':
			clearMemory();
			break;

		case key === '1/x':
			key = '^(-1)';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'square-root' || key === 'q':
			key = '&#8730;';
			keyHistories.push(key);
			showEquation();
			break;

		case key === 'nth-root' || key === 'r':
			key = '^(1:';
			keyHistories.push(key);
			showEquation();
			break;

		case key === 'base-e' || key === 'e':
			key = '&#101;';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'ln' || key === 'l':
			key = 'ln(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'log' || key === 'g':
			key = 'log(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'ex':
			key = '&#101;^(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === '10x':
			key = '10^(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'sin' || key === 's':
			key = 'sin(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'cos' || key === 'c':
			key = 'cos(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'tan' || key === 't':
			key = 'tan(';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'pi' || key === 'p':
			key = '&#928;';
			keyHistories.push(key);
			showEquation();
			printResult();
			break;

		case key === 'deg':
			degree = false;
			degToRad();
			printResult();
			break;

		case key === 'rad':
			degree = true;
			radToDeg();
			printResult();
			break;

		case key === 'inv':
			inversion();
			break;

		default:
			break;
	}
}

function printResult() {
	const res = calc();
	if (!isNaN(res)) {
		finalResult.innerHTML = res.toLocaleString('en');
	} else {
		finalResult.innerHTML = res;
	}
}

function calc() {
	//will need to handle long equation
	var output = "";
	var len = keyHistories.length;
	output = evaluate(keyHistories);

	if (len <= 0) {
		return "";
	}
	console.log(output);
	output = output.replace(/\+$/, '');
	output = output.replace(/\-$/, '');
	output = output.replace(/\/$/, '');
	output = output.replace(/\*$/, '');
	console.log(output);
	if (output == '') {
		return "";
	}
	try {
		result = eval(output);
		console.log(result);
		if (result == 'Infinity') {
			return "error";
		}
		if (!isNaN(result)) {
			return result;
		}
	}
	catch (e) {
		// console.log("error message: " + e.name);
		return "error";
	}
}

function clear() {
	equationEle.innerHTML = "";
	equationEle.classList.remove('equation-flyout');
	resultEle.querySelector("span").innerHTML = "";
	resultEle.classList.remove('final-result');
	keyHistories = [];
}

function showEquation() {
	equationEle.innerHTML = "";
	if (equationEle.classList.contains('equation-flyout')) {
		equationEle.style.transition = 'none';
		equationEle.classList.remove('equation-flyout');
	}

	if (resultEle.classList.contains('final-result')) {
		resultEle.style.transition = 'none';
		resultEle.classList.remove('final-result');
	}

	resultEle.querySelector("span").innerHTML = "";
	let len = keyHistories.length;
	for (let i = 0; i < len; i++) {
		if (keyHistories[i] === '/') {
			equationEle.innerHTML += ' ' + '&#247;' + ' ';
		} else if (keyHistories[i] === '+' || keyHistories[i] === '-' || keyHistories[i] === '*') {
			equationEle.innerHTML += ' ' + keyHistories[i] + ' ';
		} else {
			equationEle.innerHTML += keyHistories[i];
		}
	}
}
// var keyStr = '5 * 8^(2) + 7log(4) + 7^(1:2)';
function evaluate(keys) {
	const keyStr = keys.join('');
	let reg = '';
	let m = [];
	let found = '';

	// for ^(n)
	found = keyStr.replace(/(\^)(\()(\d)\)/g, '**$3');
	// for 3%5 = 0.03 * 5
	found = found.replace(/(\%)(\d)/g, '*0.01*$2');
	//for % eg. 3% = 0.03
	found = found.replace(/\%/g, '*0.01');

	reg = /(\d+)\!/; //do not use global here.
	while ((m = reg.exec(found)) !== null) {
		found = found.replace(/(\d+)\!/, factorial(m[1]));
	}

	//for square root
	found = found.replace(/(\d+)&#8730;/g, '$1*&#8730;');
	reg = /&#8730;(\d+)/; //do not use global here.
	while ((m = reg.exec(found)) !== null) {
		found = found.replace(/&#8730;(\d+)/, sqrt(m[1]));
	}

	// for nth root
	reg = /(\d+)(\^)(\()(1:)(\d+)\)/; //do not use global here.
	while ((m = reg.exec(found)) !== null) {
		found = found.replace(/\d+\^\(1:\d+\)/, nthRoot(m[1], m[5]));
	}

	//for pi
	found = found.replace(/(\d+)&#928;/g, '$1*pi()');
	found = found.replace(/&#928;(\d+)/g, '$1*pi()');
	found = found.replace(/&#928;/g, pi());

	//for base e
	found = found.replace(/(\d+)&#101;/g, `$1*baseE()`);
	found = found.replace(/&#101;(\d+)/g, `$1*baseE()`);
	found = found.replace(/&#101;/g, baseE());

	//for sin
	found = found.replace(/(\d+)sin\((\d+)\)/g, `$1*sin($2)`);
	found = found.replace(/sin\((\d+)\)(\d+)/g, `sin($1)*$2`);
	found = found.replace(/sin\((\d+)\)/g, `sin($1)`);

	//for cos
	found = found.replace(/(\d+)cos\((\d+)\)/g, `$1*cos($2)`);
	found = found.replace(/cos\((\d+)\)(\d+)/g, `cos($1)*$2`);
	found = found.replace(/cos\((\d+)\)/g, `cos($1)`);

	//for tan
	found = found.replace(/(\d+)tan\((\d+)\)/g, `$1*tan($2)`);
	found = found.replace(/tan\((\d+)\)(\d+)/g, `tan($1)*$2`);
	found = found.replace(/tan\((\d+)\)/g, `tan($1)`);

	//for ln
	found = found.replace(/(\d+)ln\((\d+)\)/g, `$1*ln($2)`);
	found = found.replace(/ln\((\d+)\)(\d+)/g, `ln($1)*$2`);
	found = found.replace(/ln\((\d+)\)/g, `ln($1)`);

	// for log
	found = found.replace(/(\d+)log\((\d+)\)/g, `$1*log($2)`);
	found = found.replace(/log\((\d+)\)(\d+)/g, `log($1)*$2`);
	found = found.replace(/log\((\d+)\)/g, `log($1)`);

	//for 1/x
	found = found.replace(/(\d+)\^\(-1\)/g, `1 / $1`);
	return found;
}

function factorial(x) {
	if (x === 0) {
		return 1;
	}
	else {
		return factorial(x - 1) * x;
	}
}

function sqrt(x) {
	return Math.sqrt(x);
}

function power(base, exponent) {
	if (exponent === 0) {
		return 1;
	} else {
		return base * power(base, exponent - 1);
	}
}

function nthRoot(x, y) {
	if (y === 0) {
		return "Can't divide by 0";
	} else {
		return Math.pow(x, 1 / y);
	}
}

function pi() {
	return Math.PI;
}

function sin(x) {
	if (degree) {
		x = x * pi() / 180;
	}
	return Math.sin(x);
}
function cos(x) {
	if (degree) {
		x = x * pi() / 180;
	}
	return Math.cos(x);
}
function tan(x) {
	if (degree) {
		x = x * pi() / 180;
	}
	return Math.tan(x);
}
function ln(x) {
	return Math.log(x);
}
function log(x) {
	return Math.log10(x);
}
function baseE() {
	return Math.E;
}

function radToDeg() {
	const rad = document.getElementsByClassName('rad')[0];
	const note = document.getElementById('note');
	rad.classList.remove('rad');
	rad.classList.add('deg');
	rad.dataset.id = 'deg';
	rad.innerHTML = 'RAD';
	note.innerHTML = 'DEG'
}
function degToRad() {
	const deg = document.getElementsByClassName('deg')[0];
	const note = document.getElementById('note');
	deg.classList.remove('deg');
	deg.classList.add('rad');
	deg.dataset.id = 'rad';
	deg.innerHTML = 'DEG';
	note.innerHTML = 'RAD';
}

function inversion() {
	var ln = document.querySelectorAll("[data-id='ln']")[0];
	var log = document.querySelectorAll("[data-id='log']")[0];
	var ePowerX = document.querySelectorAll("[data-id='ex']")[0];
	var tenPowerX = document.querySelectorAll("[data-id='10x']")[0];

	if (ln && log) {
		ln.innerHTML = 'e^x';
		ln.dataset.id = 'ex';
		log.innerHTML = '10^x';
		log.dataset.id = '10x';
	} else if (ePowerX && tenPowerX) {
		ePowerX.innerHTML = 'ln';
		ePowerX.dataset.id = 'ln';
		tenPowerX.innerHTML = 'log';
		tenPowerX.dataset.id = 'log';
	} else {
		console.log("One or more errors");
	}
}

function storeValue(added) {
	mem.innerHTML = 'M';
	if (added === true) {
		storedValue += result;
	} else {
		storedValue -= result;
	}
}

function recallMemory() {
	clear();
	equationEle.innerHTML = storedValue;
	keyHistories.push(storedValue);
}

function clearMemory() {
	storedValue = 0;
	mem.innerHTML = '';
}

function checkOperator(key) {
	let flag = false;
	switch (key) {
		case '+':
		case '-':
		case '*':
		case '/':
			flag = true;
			break;
		default:
			flag = false;
			break;
	}
	return flag;
}
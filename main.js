document.addEventListener('DOMContentLoaded', () => {
	resetAll();
});

/**********
 * DATA *
 **********/

let sixes = [];
let doubleSixes = [];
let twelves = [];
let twenties = [];

/********************
 * HELPER FUNCTIONS *
 ********************/

const getRandomNumber = function (max) {
	const rand = Math.random();
	const range = rand * max;
	const result = Math.ceil(range);
	return result;
};

const sortByNumber = function (arr) {
	const byNumber = function (item1, item2) {
		return item1 - item2;
	};

	return arr.slice().sort(byNumber);
};

/*******************
 * YOUR CODE BELOW *
 *******************/
const resetButton = document.querySelector('#reset-button');
const d6Image = document.querySelector('#d6-roll');
const doubleD6One = document.querySelector('#double-d6-roll-1');
const doubleD6Two = document.querySelector('#double-d6-roll-2');
const d12Roll = document.querySelector('#d12-roll');
const d20Roll = document.querySelector('#d20-roll');
/*******************
 * EVENT LISTENERS *
 *******************/

resetButton.addEventListener('click', resetAll);

d6Image.addEventListener('click', d6RollFunction);

doubleD6One.addEventListener('click', doubleD6TwoRoller);
doubleD6Two.addEventListener('click', doubleD6TwoRoller);
d12Roll.addEventListener('click', d12Roller);
d20Roll.addEventListener('click', d20Roller);
/******************
 * RESET FUNCTION *
 ******************/

function resetAll() {
	// resetign all the values
	sixes = [];
	doubleSixes = [];
	twelves = [];
	twenties = [];
	document
		.querySelector('#d6-roll')
		.setAttribute('src', './images/start/d6.png');

	document
		.querySelector('#double-d6-roll-1')
		.setAttribute('src', './images/start/d6.png');
	document
		.querySelector('#double-d6-roll-2')
		.setAttribute('src', './images/start/d6.png');
	document
		.querySelector('#d12-roll')
		.setAttribute('src', './images/start/d12.jpeg');

	document
		.querySelector('#d20-roll')
		.setAttribute('src', './images/start/d20.jpg');

	// seting to NA
	document.querySelector('#d6-rolls-mean').innerHTML = 'NA';
	document.querySelector('#d6-rolls-median').innerHTML = 'NA';
	document.querySelector('#d6-rolls-mode').innerHTML = 'NA';

	document.querySelector('#double-d6-rolls-mean').innerHTML = 'NA';
	document.querySelector('#double-d6-rolls-median').innerHTML = 'NA';
	document.querySelector('#double-d6-rolls-mode').innerHTML = 'NA';

	document.querySelector('#d12-rolls-mean').innerHTML = 'NA';
	document.querySelector('#d12-rolls-median').innerHTML = 'NA';
	document.querySelector('#d12-rolls-mode').innerHTML = 'NA';

	document.querySelector('#d20-rolls-mean').innerHTML = 'NA';
	document.querySelector('#d20-rolls-median').innerHTML = 'NA';
	document.querySelector('#d20-rolls-mode').innerHTML = 'NA';
}

/****************************
 * CLICK HANDLING FUNCTIONS *
 ****************************/


function d6RollFunction() {
	let result1 = getRandomNumber(6);
	d6Image.setAttribute('src', './images/d6/' + result1 + '.png');

	//adding numbers into array
	sixes.push(result1);

	let mean = getAverage(sixes);
	let median = getMedian(sixes);
	let mode = getMode(sixes);

	document.querySelector('#d6-rolls-mean').innerHTML = mean;
	document.querySelector('#d6-rolls-median').innerHTML = median;
	document.querySelector('#d6-rolls-mode').innerHTML = mode;
}




function doubleD6TwoRoller() {
	let result2 = getRandomNumber(6);
	let result3 = getRandomNumber(6);

	doubleD6One.setAttribute('src', './images/d6/' + result2 + '.png');
	doubleD6Two.setAttribute('src', './images/d6/' + result3 + '.png');

  	//adding numbers into array
	doubleSixes.push(result2, result3);

	let mean = getAverage(doubleSixes);
	let median = getMedian(doubleSixes);
	let mode = getMode(doubleSixes);

	document.querySelector('#double-d6-rolls-mean').innerHTML = mean;
	document.querySelector('#double-d6-rolls-median').innerHTML = median;
	document.querySelector('#double-d6-rolls-mode').innerHTML = mode;
}

function d12Roller() {
	let randomDNumber1 = getRandomNumber(12);
	d12Roll.setAttribute('src', './images/numbers/' + randomDNumber1 + '.png');

  //adding numbers into array
	twelves.push(randomDNumber1);

	let mean = getAverage(twelves);
	let median = getMedian(twelves);
	let mode = getMode(twelves);

	document.querySelector('#d12-rolls-mean').innerHTML = mean;
	document.querySelector('#d12-rolls-median').innerHTML = median;
	document.querySelector('#d12-rolls-mode').innerHTML = mode;
}
function d20Roller() {
	let randomDNumber2 = getRandomNumber(20);
	d20Roll.setAttribute('src', './images/numbers/' + randomDNumber2 + '.png');

  //adding numbers into array
	twenties.push(randomDNumber2);

	let mean = getAverage(twenties);
	let median = getMedian(twenties);
	let mode = getMode(twenties);

	document.querySelector('#d20-rolls-mean').innerHTML = mean;
	document.querySelector('#d20-rolls-median').innerHTML = median;
	document.querySelector('#d20-rolls-mode').innerHTML = mode;
}
/****************
 * MATH SECTION *
 ****************/

function getAverage(array) {
	let sum = 0;

	for (const num of array) {
		sum += num;
	}

	return sum / array.length.toFixed(2);
}

function getMedian(array) {
	if (array.length === 0) {
		return 0;
	}
	let sorted = sortByNumber(array);
	if (sorted.length % 2 === 0) {
		let middleOne = sorted.length / 2;
		let middleTwo = sorted.length / 2 - 1;
		let trueMiddle = (sorted[middleOne] + sorted[middleTwo]) / 2;
		return trueMiddle;
	} else {
		let middleIndex = Math.floor(sorted.length / 2);
		return sorted[middleIndex];
	}
}

function getMode(array) {
	let countObject = {};

	for (let number of array) {
		if (countObject[number] >= 1) {
			countObject[number]++;
		} else {
			countObject[number] = 1;
		}
	}

	let highestUniqueNumber = 0;
	let highestCount = 0;
	let keys = Object.keys(countObject);

	for (let number of keys) {
		let value = countObject[number];

		if (value > highestCount) {
			highestCount = value;
			highestUniqueNumber = number;
		}
	}
	return highestUniqueNumber;
}

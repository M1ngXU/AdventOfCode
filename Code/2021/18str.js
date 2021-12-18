import { Parser, Graph, M_Set, Matrix, Number_Array, Sort, Vector } from './../../API.js';

var fnExplode = (input, index) => {
}

var fnGetClosingBracketIndex = (input, start_index) => {
	var bracket_amount = 0;
	var bracket_index;
	input.slice(start_index + 1).split('').forEach((b, i) => {
		if (bracket_index !== undefined) return;
		if (b === '[') bracket_amount++;
		if (b === ']') bracket_amount--;
		if (bracket_amount < 0) bracket_index = i;
	});
	return bracket_index + start_index + 2;
}

var fnGetOpenBracketIndex = (input, start_index) => {
	var bracket_amount = 0;
	var bracket_index;
	input.slice(0, start_index).split('').reverse().forEach((b, i) => {
		if (bracket_index !== undefined) return;
		if (b === '[') bracket_amount++;
		if (b === ']') bracket_amount--;
		if (bracket_amount > 0) bracket_index = i;
	});
	return start_index - bracket_index - 1;
}

var fnGetNumber = (input, index) => {
	if (input[index] === ']') return input.slice(fnGetOpenBracketIndex(input, index), index + 1);
	if (input[index] === '[') return input.slice(index, fnGetClosingBracketIndex(input, index));
	return input.slice(index, Math.min(input.indexOf(']', index), input.indexOf(',', index)));
}

var fnSetNumber = (input, value, index) => {
	index = index.flat();
	var n = input;
	for (var i = 0; i < index.length - 1; i++) {
		n = n[index[i]];
	}
	n[index.at(-1)] = value;
}

var fnGetNumberIndexLeft = (input, index) => {
	var number;
	input.slice(0, index).split('').reverse().forEach((c, i) => {
		if (number !== undefined) return;
		var n = fnGetNumber(input, index - i);
		if (Number.isFinite(parseInt(n))) {
			if (typeof(input[index - i - 1] === ',' || input[index - i - 1] === '[')
					&& (input[index - i + n.length] === ',' || input[index - i + n.length] === ']')) number = index - i;
		}
	});
	return number;
}

var fnGetNumberIndexRight = (input, index) => {
	var number;
	input.slice(index).split('').forEach((c, i) => {
		if (number !== undefined) return;
		var n = fnGetNumber(input, index + i);
		if (Number.isFinite(parseInt(n))) {
			if (typeof(input[index + i - 1] === ',' || input[index + i - 1] === '[')
					&& (input[index + i + n.length] === ',' || input[index + i + n.length] === ']')) number = i + index;
		}
	});
	return number;
}

var fnExplode = (input, index) => {
	var bracket = fnGetNumber(input, index);
	var number = bracket.slice(1, -1).split(',').map(v => parseInt(v));
	var left = fnGetNumberLeft(input, index);
	var right = fnGetNumberRight(input, index + bracket.length);
	if (left !== undefined) fnSetNumber(input, fnGetNumber(input, left) + number[0], left);
	if (right !== undefined) fnSetNumber(input, fnGetNumber(input, right) + number[1], right);
	return input;
}

export function execute(input_data) {
	var input = '[0,[[[[9,8],1],2],3],4]';
	/*var i = [0,0,0,0];
	var tuple = fnGetNumber(input,i);
	var right = i;
	right[right.length - 1] = 1;
	for (var j = 0; j < right.length; j++) {
		var n = fnGetNumber(input, right.slice(0, j + 1));
		if (typeof n === 'number') console.log(n);
	}*/
	fnExplode(input, 6);
	console.log(input);
	//return [ max_y * (max_y + 1) / 2, different_velocities ];
}
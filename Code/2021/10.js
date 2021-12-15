import { Number_Array } from './../../API.js';

const brackets = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>'
}
const corrupted_cost = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137
}

export function execute(input_data) {
	var global_corrupted = [];
	var global_incomplete = [];

	input_data.split('\n').map(i => {
		var line = [];
		var corrupted = 0;
		i.split('').forEach(c => {
			if (corrupted) return;
			if (Object.keys(brackets).find(b => b === c)) return line.push(c);
			if (brackets[line.pop()] !== c) return corrupted = corrupted_cost[c];
		});
		if (corrupted) return global_corrupted.push(corrupted);
		if (line.length === 0) return;
		global_incomplete.push(
			line.reverse()
			.map(c => Object.keys(brackets).indexOf(c) + 1)
			.reduce((a, b) => 5 * a + b, 0)
		);
	});
	return [
		new Number_Array(global_corrupted).sum,
		new Number_Array(global_incomplete).med
	];
}
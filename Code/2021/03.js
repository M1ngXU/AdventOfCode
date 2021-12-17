import { Parser } from './../../API.js';

export function execute(input_data) {
	var input = Parser.matrix(input_data);
	var gamma = '';
	var epsilon = '';
	for (var x = 0; x < input.width; x++) {
		var most_common = (input.getColumn(x, { value_only: true }).filter(x => x === 1).length > input.height / 2) ? 1 : 0;
		epsilon += 1 - most_common;
		gamma += most_common;
	}
	
	var fnCalcRating = fnGetCommonBit => {
		var matrix = input.matrix.map(m => m.map(v => v.value));
		var bit = 0;
		while (Object.keys(matrix).length > 1) {
			var common_bit = fnGetCommonBit(matrix.map(m => m[bit]).filter(v => v === 1).length, matrix.length);
			matrix.forEach((a, y) => a[bit] !== common_bit ? delete matrix[y] : null);
			matrix = matrix.filter(m => m.filter(m => m !== null || m !== undefined));
			bit++;
		}
		return parseInt(Object.values(Object.values(matrix)[0]).join(''), 2);
	}
	return [
		parseInt(gamma, 2) * parseInt(epsilon, 2),
		fnCalcRating((ones, length) => ones >= length / 2 ? 1 : 0) * fnCalcRating((ones, length) => ones < length / 2 ? 1 : 0)
	]
}
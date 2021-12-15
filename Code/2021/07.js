import { Parser } from './../../API.js';

export function execute(input_data) {
	const input = Parser.number_array(input_data);
	var fnCalcFuel = (pos, fnCost) =>
		input.numbers.reduce((a, b) => a + fnCost(Math.abs(b - pos)), 0);
	var fnCalcPart2Fuel = pos => fnCalcFuel(pos, d => d * (d + 1) / 2);
	return [
		fnCalcFuel(input.med, d => d),
		Math.min(
			fnCalcPart2Fuel(Math.ceil(input.avg)),
			fnCalcPart2Fuel(Math.floor(input.avg))
		)
	];
}
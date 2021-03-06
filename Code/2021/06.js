import { Parser } from './../../API.js';

export function execute(input_data) {
	const fish = Parser.number_array2(input_data, 9);

	var result = [];

	var fnSimulateDay = () => {
		fish.cycle().add(6, fish.last);
	}
	for (var i = 0; i < 256; i++) {
		fnSimulateDay();
		if (i === 79 || i === 255) result.push(fish.sum);
	}
	return result;
}
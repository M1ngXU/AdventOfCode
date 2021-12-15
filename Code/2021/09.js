import { Sort, Parser } from './../../API.js';

export function execute(input_data) {
	var lowPoints = Parser.matrix(input_data).elements.filter(m =>
		m.getAdjacent().find(v => v <= m.value) === undefined
	);
	return [
		lowPoints.reduce((a, b) => a + b.value + 1, 0),
		lowPoints.map(p => {
			var i = 0;
			var options = { full_element: true, not: 9, set_value: 9 };
			var pointsToCheck = p.getAdjacent(options);
			while (pointsToCheck.length > 0) {
				pointsToCheck.push(...pointsToCheck.pop().getAdjacent(options));
				i++;
			}
			return i;
		}).sort(Sort.Descending)
		.filter((a, i) => i < 3)
		.reduce((a, b) => a * b, 1)
	];
}
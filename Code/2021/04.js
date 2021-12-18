import { Parser, Matrix } from './../../API.js';

export function execute(input_data) {
	var numbers = input_data.split('\n\n')[0].split(',').map(v => parseInt(v));
	var matrices = input_data.split('\n\n').slice(1).map(m => Parser.matrix(m, { cell_sep: ' ' }));
	var p1;
	var p2;
	var fnCalcPoints = (n, matrix) => matrix.values.filter(v => v > 0).sum * n;
	numbers.forEach(n => {
		matrices.forEach(m => m.replace_value(n, -1));
		var finished = matrices.filter(m => 
			[ 0, 1, 2, 3, 4 ].find(i =>
				m.getRow(i, { value_only: true }).filter(m => m === -1).length === 5
				|| m.getColumn(i, { value_only: true }).filter(m => m === -1).length === 5) !== undefined
		);
		if (finished.length > 0 && !p1) p1 = fnCalcPoints(n, finished[0]);
		matrices = matrices.filter(m => !finished.find(f => f === m));
		if (matrices.length === 0 && !p2) p2 = fnCalcPoints(n, finished[0]);
	});
	return [ p1, p2 ];
}
export function execute(input_data) {
	var matrix = input_data.split('\n').map(i => i.split('').map(v => parseInt(v)));
	var width = matrix[0].length;
	var height = matrix.length;
	
	var fnRun = ma => {
		var m = ma.map(y => y.map(m => [ m, 99999999999 ]));
		m[0][0][1] = 0;

		var best = Number.POSITIVE_INFINITY;
		var changed = true;
		
		var fnCalcAdj = (x, y, r) => {
			var v = m[y][x][0];
			var risk = r + v;
			if (risk < m[y][x][1]) {
				m[y][x][1] = risk;
				changed = true;
			}
		}
		
		while (changed) {
			changed = false;
			for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					var r = m[y][x][1];
					if (r < best) {
						if (x > 0) fnCalcAdj(x - 1, y, r);
						if (y > 0) fnCalcAdj(x, y - 1, r);
						if (x < width - 1) fnCalcAdj(x + 1, y, r);
						if (y < height - 1) fnCalcAdj(x, y + 1, r);
					}
				}
			}
			best = m[height - 1][width - 1][1];
		}
		return best;
	}
	var p1 = fnRun(matrix);
	
	matrix.forEach(m => {
		for (var i = 0; i < 4; i++) {
			for (var j = width; j > 0; j--) {
				m.push((m[width - j] + i) % 9 + 1);
			}
		}
	});
	for (var i = 0; i < 4; i++) {
		for (var j = height; j > 0; j--) {
			matrix.push(matrix[height - j].map(m => (m + i) % 9 + 1));
		}
	}
	height *= 5;
	width *= 5;
	return [ p1, fnRun(matrix) ];
}
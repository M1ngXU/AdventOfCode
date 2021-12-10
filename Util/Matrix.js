const Vector = require('./Vector.js');

class Matrix {
  constructor(array) {
    this.matrix = array.flatMap((a, y) =>
				a.flatMap((v, x) => new MatrixElement(x, y, v, this)));
		this.height = array.length;
		this.width = array[0].length;
  }

  getElement(x, y, options) {
    if (!options) options = {};
    var e = this.matrix.find(m => m.coordinates.x === x && m.coordinates.y === y);
    if (!e) {
      if (options.default !== null) {
        return new MatrixElement(x, y, options.default, this);
      }
      return;
    }
    return options.value_only ? e.value : e;
  }
  
  getRow(y, options) {
    if (!options) options = {};
    return getLine(new Vector({ x: 0, y: y}, { x: 1, y: 0 }, { x: options.length || width, y: 0 }));
  }
  
  getColumn(x, options) {
    if (!options) options = {};
    return getLine(new Vector({ x: x, y: 0}, { x: 0, y: 1 }, { x: 0, y: options.length || height }));
  }
  
  getLine(vector, options) {
    if (!options) options = {};
		var points = [];
		var x = vector.pos.x;
		var y = vector.pos.y;
		do {
			points.push(getElement(x, y));
			x += vector.direction.x;
			y += vector.direction.y;
		} while (x <= (vector.end.x || width) && y <= (vector.end.y || height));
		return points.filter(e => e !== null);
  }
}
module.exports = Matrix;

class MatrixElement {
  constructor(x, y, value, matrix) {
    this.coordinates = { x: x, y: y };
    this.value = value;
    this.matrix = matrix;
	}

  getAdjacent(options) {
    if (!options) options = {};
    var adjacentCells = [];
    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        if (options.diagonal || (x === 0 || y === 0) && (x !== 0 || y !== 0)) {
          adjacentCells.push(
						this.matrix.getElement(
							this.coordinates.x + x,
							this.coordinates.y + y
						)
					);
        }
      }
    }
    return adjacentCells
			.filter(e => {
				if (e.value === null || e.value === undefined) return false;
				if (options.not) return e.value !== options.not;
				return true;
			})
			.map(e => {
				if (options.set_value) e.value = options.set_value;
				return options.full_element ? e : e.value;
			});
  }
}
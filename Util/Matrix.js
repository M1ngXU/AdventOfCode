const Vector = require('./Vector.js');
const Number_Array = require('./Number_Array.js');

class Matrix {
  constructor(array) {
		this.height = array.length;
		this.width = array[0].length;
		this.array = array;
    this.matrix = array.flatMap((a, y) =>
			a.map((v, x) => {
				var n = new MatrixElement(x, y, v, this);
				this.array[y][x] = n;
				return n;
			}));
  }

	static getEmptyMatrix(width, height, default_value) {
		return new Matrix(Array.from(
			new Array(height),
			() => Array.from(new Array(width), () => default_value)
		));
	}

  getElement(x, y, options) {
    if (!options) options = {};
		var e;
		if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
			e = this.array[y][x];
		} else {
			if (options.search_elements) e = this.matrix.find(m => m.coordinates.x === x && m.coordinates.y === y);
		}
    if (e === undefined) {
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
		var x = vector.pos.x - vector.direction.x;
		var y = vector.pos.y - vector.direction.y;
		var fnReachedEndX;
		if (vector.pos.x > vector.end.x) {
			fnReachedEndX = () => x <= (vector.end.x || 0)
		} else {
			fnReachedEndX = () => x >= (vector.end.x || this.width)
		}
		var fnReachedEndY;
		if (vector.pos.y > vector.end.y) {
			fnReachedEndY = () => y <= (vector.end.y || 0)
		} else {
			fnReachedEndY = () => y >= (vector.end.y || this.height)
		}
		while (!fnReachedEndX() || !fnReachedEndY()) {
			x += vector.direction.x;
			y += vector.direction.y;
			points.push(this.getElement(x, y, options));
		}
		return points.filter(e => e !== null);
  }

	get values() {
		return new Number_Array(this.matrix.map(m => m.value));
	}

	clone() {
		var m =  Matrix.getEmptyMatrix(this.width, this.height);
		this.matrix.forEach(e => m.getElement(e.coordinates.x, e.coordinates.y).value = e.value);
		return m;
	}
	
	toString(length_per_value) {
		if (!length_per_value)
			length_per_value = this.array.flat().reduce((a, b) => a > ('' + b.value).length ? a : ('' + b.value).length, 0) + 1;
		var result = '';
		for (var y = 0; y < this.height; y++) {
			if (y > 0) result += '\n';
			for (var x = 0; x < this.width; x++) {
				var e = '' + this.getElement(x, y, { default: '﹖', value_only: true });
				if (e.length < length_per_value) {
					while (e.length < length_per_value) {
						e += ' ';
					}
				}
				result += e;
			}
		}
		return result;
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
        if (options.diagonal || ((x === 0 || y === 0) && (x !== 0 || y !== 0))) {
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
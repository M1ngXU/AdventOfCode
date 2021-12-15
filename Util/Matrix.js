import Vector from './Vector.js';
import Number_Array from './Number_Array.js';

export default class Matrix {
  constructor(options) {
		if (typeof options !== 'object') options = {};
		this.matrix = {};
		this.default_value = options.default_value;
		if (options.start_arr) {
			this.matrix = options.start_arr.map((v, y) => v.map((e, x) => new MatrixElement(x, y, e, this)));
			this.width = this.matrix[0].length;
			this.height = this.matrix.length;
			this.fixed_size = true;
		} else {
			this.width = 0;
			this.height = 0;
		}
  }

	get elements() {
		return Object.keys(this.matrix).flatMap(k => Object.values(this.matrix[k]));
	}

	set_width(width) {
		this.width = width;
		Object.keys(this.matrix).forEach(k => Object.keys(this.matrix[k]).filter(k => k > width).forEach(kk => delete this.matrix[k][kk]));
	}
	
	set_height(height) {
		this.height = height;
		Object.keys(this.matrix).filter(k => k > height).forEach(k => delete this.matrix[k]);
	}

	addToElement(x, y, value, options) {
		if (typeof options != 'object') options = {};
		var e = this.getElement(x, y);
		if (!e || options.max !== undefined && e.value + value > options.max) return;
		e.value += value;
	}

	setElement(x, y, value, options) {
		if (typeof options !== 'object') options = {};
		this.getElement(x, y, options).value = value;
	}

  getElement(x, y, options) {
		if (typeof options !== 'object') options = {};
		var def_val = options.default_value ? options.default_value : this.default_value;
		if (x < 0 || y < 0 || (this.fixed_size && (x >= this.width || y >= this.height))) return def_val;
		var e;
		if (!options.create_imm || x > this.width || y > this.height) {
			if (x >= 0 && y >= 0) {
				e = this.matrix[y] && this.matrix[y][x];
			} else {
				return def_val;
			}
		}
    if (!e) {
			if (x > this.width) this.width = x + 1;
			if (y > this.height) this.height = y + 1;
			if (!options.no_creation) {
				e = new MatrixElement(x, y, def_val, this);
				if (!this.matrix[y]) this.matrix[y] = {};
				this.matrix[y][x] = e;
			} else {
				return def_val;
			}
    }
    return options.value_only ? e.value : e;
  }
  
  getRow(y, options) {
		if (typeof options !== 'object') options = {};
    return getLine(new Vector({ x: 0, y: y}, { x: 1, y: 0 }, { x: options.length || width, y: 0 }));
  }
  
  getColumn(x, options) {
		if (typeof options !== 'object') options = {};
    return getLine(new Vector({ x: x, y: 0}, { x: 0, y: 1 }, { x: 0, y: options.length || height }));
  }
  
  getLine(vector, options) {
		if (typeof options !== 'object') options = {};
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
		return new Number_Array(this.elements.map(m => m.value));
	}
	
	toString(options) {
		if (typeof options !== 'object') options = {};
		if (!options.length_per_value)
			options.length_per_value = this.elements.reduce((a, b) => a > ('' + b.value).length ? a : ('' + b.value).length, 0) + 1;
		var result = '';
		for (var y = 0; y < this.height; y++) {
			if (y > 0) result += '\n';
			for (var x = 0; x < this.width; x++) {
				var e = '' + this.getElement(x, y, { no_creation: true, default_value: options.default_value !== undefined ? options.default_value : '﹖', value_only: true });
				if (e.length < options.length_per_value) {
					e = ' '.repeat(options.length_per_value - e.length) + e;
				} else {
					e = e.slice(0, options.length_per_value);
				}
				result += e;
			}
		}
		return result;
	}
}

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
				if (e === null || e === undefined || e.value === null || e.value === undefined) return false;
				if (options.not) return e.value !== options.not;
				return true;
			})
			.map(e => {
				if (options.set_value) e.value = options.set_value;
				return options.full_element ? e : e.value;
			});
  }
}
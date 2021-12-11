const Sort = require('./../Util/Sort.js');

class Number_Array {
  constructor(array) {
    this.array = [];
		if (typeof array[0] !== 'object') {
			array.forEach((a, i) => this.array.push({ real_index: i, number: a }));
		} else {
			this.array = array;
		}
  }

	add(i, amount) {
		this.getElementAt(i).number += amount;
	}

	get asc() {
		return new Number_Array(this.elements.sort(Sort.AscendingKey('number')));
	}

	get avg() {
		return this.sum / this.length;
	}

	cycle() {
		this.array.push(this.array.shift());
		return this;
	}

	get desc() {
		return new Number_Array(this.elements.sort(Sort.DescendingKey('number')));
	}

	get first() {
		return this.getNumberAt(0);
	}

	get elements() {
		return this.array;
	}

	getElementAt(i) {
		return this.elements[i];
	}

	getNumberAt(i) {
		return this.numbers[i];
	}

	get last() {
		return this.getNumberAt(this.length - 1);
	}

	get length() {
		return this.array.length;
	}

	get numbers() {
		return this.array.map(a => a.number);
	}

	get med() {
		if (this.length % 2 === 0) {
			var a = this.asc.getNumberAt(this.length / 2);
			var b = this.asc.getNumberAt(this.length / 2 - 1);
			return (a + b) / 2;
		}
		return this.getNumberAt((this.length - 1) / 2);
	}

	get prod() {
		return this.numbers.reduce((a, b) => a * b, 1);
	}

	get sum() {
		return this.numbers.reduce((a, b) => a + b, 0);
	}
}
module.exports = Number_Array;
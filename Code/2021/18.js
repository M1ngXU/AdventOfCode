class Node {
	constructor(content, parent, is_right) {
		if (content === undefined) return;
		this._parent = parent;
		if (typeof content === 'number') return this._value = content;
		this._left = new Node(content[0], this, false);
		this._right = new Node(content[1], this, true);
	}

	get is_right() {
		return this.parent.right === this;
	}
	
	get is_left() {
		return this.parent.left === this;
	}
	
	get parent() {
		return this._parent;
	}
	
	get value() {
		return this._value === undefined ? -1 : this._value;
	}
	
	get left() {
		return this._left;
	}
	
	get right() {
		return this._right;
	}
	
	get depth() {
		if (!this.parent) return 0;
		return this.parent.depth + 1;
	}
	
	_search_number(searched_side) {
		var other_side = searched_side === 'right' ? 'left' : 'right';
		if (this['is_' + other_side] && this.parent[searched_side].value !== -1) return this.parent[searched_side];
		var t = this;
		var switched_edge = false;
		do {
			if (switched_edge) {
				t = t[other_side];
			} else if (t['is_' + searched_side]) {
				t = t.parent;
				if (!t.parent) return;
			} else {
				switched_edge = true;
				t = t.parent[searched_side];
			}
		} while (t.value === -1);
		return t;
	}
	
	get number_right() {
		return this._search_number('right');
	}
	
	get number_left() {
		return this._search_number('left');
	}
	
	get magnitude() {
		if (this.value !== -1) return this.value;
		return this.left.magnitude * 3 + this.right.magnitude * 2;
	}
	
	reduce() {
		while (this.explode() || this.split());
		return this;
	}
	
	explode() {
		if (this.value !== -1 || this.depth !== 4) {
			return !!this.left?.explode() || !!this.right?.explode();
		}
		var left = this.left.number_left;
		if (left) left.add(this.left.value);
		var right = this.right.number_right;
		if (right) right.add(this.right.value);
		this._right = null;
		this._left = null;
		this._value = 0;
		return true;
	}
	
	split() {
		if (this.value < 10) {
			return !!this.left?.split() || !!this.right?.split();
		}
		this._left = new Node(Math.floor(this.value / 2), this, false);
		this._right = new Node(Math.ceil(this.value / 2), this, true);
		this._value = undefined;
		return true;
	}
	
	add(amount) {
		this._value += amount;
	}
	
	toString() {
		return this.toArray().toString();
	}
	
	toArray() {
		return this.value !== -1 ? this.value : [ this.left.toArray(), this.right.toArray() ];
	}
	
	concat(node) {
		this._parent = new Node();
		node._parent = this._parent;
		this._parent._left = this;
		this._parent._right = node;
		return this._parent;
	}
}

export function execute(input_data) {
	var input = input_data.split('\n').map(t => new Node(JSON.parse(t)));
	var max = [];
	for (var i = 0; i < input.length; i++) {
		for (var j = 0; j < input.length; j++) {
			if (i !== j) {
				var t1 = new Node(input[i].toArray());
				var t2 = new Node(input[j].toArray());
				var r = t1.concat(t2).reduce().magnitude;
				if (r > max) max = r;
			}
		}
	}
	return [
		input.slice(1).reduce((a, b) => a.concat(b).reduce(), input[0]).magnitude,
		max
	];
}
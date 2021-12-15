export default class Vector {
	constructor(pos, direction, end) {
		this.pos = pos;
		this.direction = direction;
		this.end = end || {};
	}
}
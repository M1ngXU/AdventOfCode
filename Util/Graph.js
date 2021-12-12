class Graph {
  constructor() {
		this.edges = {};
  }

  add_edge(start, end) {
		if (!this.edges[start]) this.edges[start] = [];
		this.edges[start].push(end);
	}

	calculate_paths(start, end, validator) {
		if (!validator) validator = () => true;
		var result = [];
		var paths = [[ start ]];
		while (paths.length > 0) {
			var p = paths.pop();
			this.edges[p[0]].forEach(m => {
				if (m === end) return result.push([m].concat(p).reverse());
				if (!validator(p, m)) return;
				paths.push([m].concat(p));
			});
		}
		return result;
	}
}
module.exports = Graph;
const Graph = require('./../../Util/Graph.js');

module.exports = input_data => {
	var graph = new Graph();

	require('./../../Input/Parser.js').string_array(input_data, {
		general_sep: '-'
	}).forEach(i => {
		if (i[1] !== 'start' && i[0] !== 'end') graph.add_edge(i[0], i[1]);
		if (i[0] !== 'start' && i[1] !== 'end') graph.add_edge(i[1], i[0]);
	});
/*
	var fnGetResult = start_Without_joker => {
		var result = 0;

		var ways = [{
			edges: [ 'start' ],
			joker: start_Without_joker
		}];

		while (ways.length > 0) {
			var w = ways.pop();
			map[w.edges[0]].forEach(m => {
				if (m === 'end') return result++;
				var is_double = m === m.toLowerCase() && w.edges.includes(m);
				if (is_double && w.joker) return;
				ways.push({
					edges: [ m, ...w.edges ],
					joker: w.joker || is_double
				});
			});
		}
		return result;
	}*/
	return [ graph.calculate_paths('start', 'end', (path, to_be_added) => {
		if (to_be_added.toUpperCase() === to_be_added) return true;
		return !path.includes(to_be_added);
	}).length, graph.calculate_paths('start', 'end', (path, to_be_added) => {
		if (to_be_added.toUpperCase() === to_be_added) return true;
		return !path.includes(to_be_added) || !path.find(n => path.filter(no => no === n && no.toLowerCase() === no).length === 2);
	}).length ];
}
import { Graph, Parser } from './../../API.js';

export function execute(input_data) {
	var graph = new Graph();

	Parser.string_array(input_data, {
		general_sep: '-'
	}).forEach(i => {
		if (i[1] !== 'start' && i[0] !== 'end') graph.add_edge(i[0], i[1]);
		if (i[0] !== 'start' && i[1] !== 'end') graph.add_edge(i[1], i[0]);
	});
	return [ graph.calculate_paths('start', 'end', (path, to_be_added) => {
		if (to_be_added.toUpperCase() === to_be_added) return true;
		return !path.includes(to_be_added);
	}).length, graph.calculate_paths('start', 'end', (path, to_be_added) => {
		if (to_be_added.toUpperCase() === to_be_added) return true;
		return !path.includes(to_be_added) || !path.find(n => path.filter(no => no === n && no.toLowerCase() === no).length === 2);
	}).length ];
}
import { Parser } from './../../API.js';

export function execute(input_data) {
	var input = Parser.string_array(input_data, {
		new_line: '\n',
		general_sep: ' '
	});
	input = input.map(i => ({ forward: i[0] === 'forward', amount: parseInt(i[1]) * (i[0] === 'up' ? -1 : 1) }));
	var forward = 0;
	var depth_without_aim = 0;
	var depth_with_aim = 0;
	var aim = 0;
	input.forEach(i => i.forward ? (forward += i.amount) && (depth_with_aim += aim * i.amount) : (aim += i.amount) && (depth_without_aim += i.amount));
	return [ forward * depth_without_aim, forward * depth_with_aim ]
}
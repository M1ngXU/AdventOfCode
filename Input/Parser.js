const fs = require('fs');
const Matrix = require('./../Util/Matrix.js');
const Number_Array = require('./../Util/Number_Array.js');

module.exports = {
	parse_file: (year, day, use_example) => fs.readFileSync(
		__dirname + '/'
		+ (use_example ? 'Example' : 'Exercise')
		+ '/' + year
		+ '/' + day
		+ '.input'
	).toString(),
	matrix: (input_data, options) => {
		if (typeof options !== 'object') options = {};
		if (typeof options.new_row !== 'string') options.new_row = '\n';
		if (typeof options.cell_sep !== 'string') options.cell_sep = '';
		return new Matrix(
			input_data.split(options.new_row)
			.map(v => v.split(options.cell_sep).map(w => parseInt(w)))
		);
	},
	string_array: (input_data, options) => {
		if (typeof options !== 'object') options = {};
		if (typeof options.new_line !== 'string') options.new_line = '\n';
		if (typeof options.general_sep !== 'string') options.general_sep = ' ';
		var fnSplitInline = r => r.split(options.general_sep).map(r => options.parse_float ? parseFloat(r) : r);
		var result = input_data.split(options.new_line);
		if (typeof options.inline_sep === 'string')
			return result.map(r => r.split(options.inline_sep).map(fnSplitInline));
		return result.map(fnSplitInline);
	},
	number_array: (input_data, options) => {
		if (typeof options !== 'object') options = {};
		if (typeof options.sep !== 'string') options.sep = ',';
		return new Number_Array(input_data.split(options.sep).map(i => parseFloat(i)));
	},
	number_array2: (input_data, size, options) => {
		if (typeof options !== 'object') options = {};
		if (typeof options.sep !== 'string') options.sep = ',';
		var n = new Number_Array(Array.from(new Array(size), () => 0));
		input_data.split(options.sep).forEach(i => n.add(parseInt(i), 1));
		return n;
	}
}
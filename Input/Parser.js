const fs = require('fs');
const Matrix = require('./../Util/Matrix.js');

var fnGetInputData = (year, day, example) => {
	return fs.readFileSync(
		__dirname + '/'
		+ (example ? 'Example' : 'Exercise')
		+ '/' + year
		+ '/' + (day < 10 ? '0' : '')+ day
		+ '.input'
	).toString()
}

module.exports = {
	parse_file: fnGetInputData,
	matrix: (year, day, options) => {
		if (typeof options !== 'object') options = {};
		if (typeof options.new_row !== 'string') options.new_row = '\n';
		if (typeof options.cell_sep !== 'string') options.cell_sep = '';
		return new Matrix(
			fnGetInputData(year, day, options.load_example).split(options.new_row)
			.map(v => v.split(options.cell_sep).map(w => parseInt(w)))
		);
	}
}
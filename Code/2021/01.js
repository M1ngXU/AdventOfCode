module.exports = input_data => {
	var input = require('./../../Input/Parser.js').number_array(input_data, {
		sep: '\n'
	});
	return [
		input.delta.numbers.filter(d => d > 0).length,
		input.numbers.slice(3).map((n, i) => n - input.numbers[i]).filter(d => d > 0).length ]
}
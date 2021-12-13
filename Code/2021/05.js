const Matrix = require('./../../Util/Matrix.js');
const Vector = require('./../../Util/Vector.js');

module.exports = input_data => {
	var input = [];
	require('./../../Input/Parser.js').string_array(input_data, {
		general_sep: ',',
		inline_sep: ' -> ',
		parse_float: true
	}).forEach(i => i[0][0] === i[1][0] || i[0][1] === i[1][1] ? input.unshift(i) : input.push(i));
	var matrix = new Matrix({ default_value: 0 });
	var result = [];
	var fnPushResult = () => result.push(matrix.values.filter(v => v >= 2).length);
	
	input.forEach(i => {
		if (result.length === 0 && !(i[0][0] === i[1][0] || i[0][1] === i[1][1])) fnPushResult();
		matrix.getLine(
			new Vector(
				{ x: i[0][0], y: i[0][1] },
				{ x: Math.sign(i[1][0] - i[0][0]), y: Math.sign(i[1][1] - i[0][1]) },
				{ x: i[1][0], y: i[1][1] }
			)
		).forEach(e => e.value++);
	});
	fnPushResult();
	return result;
}
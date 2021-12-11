const M_Set = require('./../../Util/M_Set.js');

module.exports = input_data => {
	const input = require('./../../Input/Parser.js').string_array(input_data, {
		inline_sep: ' | '
	});
	var result = input.map(i => {
		const digits = i[0].map(v => new M_Set(v.split('')));
		
		var num = [];
		num[1] = digits.find(d => d.length === 2);
		num[7] = digits.find(d => d.length === 3);
		num[4] = digits.find(d => d.length === 4);
		num[8] = digits.find(d => d.length === 7);
		num[3] = digits.find(d => d.length === 5 && d.intersection(num[1]).length === 2);
		num[6] = digits.find(d => d.length === 6 && d.intersection(num[7]).length === 2);
		num[5] = digits.find(d => d.length === 5 && d.intersection(num[4]).length === 3 && d.intersection(num[6]).length === 5);
		num[0] = digits.find(d => d.length === 6 && d.union(num[5]).length === 7);
		num[9] = digits.find(d => d.length === 6 && d.intersection(num[4]).length === 4);
		num[2] = digits.find(d => d.length === 5 && d.intersection(num[4]).length === 2);
		
		return i[1]
			.map(v => new M_Set(v.split('')))
			.map(v => num.indexOf(num.find(d => d.equals(v))))
	});
	return [
		result.reduce((a, b) => a + [ 1, 4, 7, 8].reduce((f, g) => f + b.filter(c => c === g).length, 0), 0),
		result.reduce((a, b) => a + b.reduce((c, d) => c * 10 + d, 0), 0)
	]
}
const Parser = require('./Input/Parser.js');

module.exports = (year, day, use_example) => {
	if (typeof day === 'number') day = (day < 10 ? '0' : '') + day;
	console.log(year + '/' + day);
	require('./Code/' + year + '/' + day + '.js')(Parser.parse_file(year, day, use_example))
		.forEach((r, i) => console.log((i === 0 ? ' *' : '**') + ':', r));
}
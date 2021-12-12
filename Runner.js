const Parser = require('./Input/Parser.js');

module.exports = (year, day, use_example) => {
	if (typeof day === 'number') day = (day < 10 ? '0' : '') + day;
	console.log(year + '/' + day);
	var t = Date.now();
	require('./Code/' + year + '/' + day + '.js')(Parser.parse_file(year, day, use_example))
		.forEach((r, i) => console.log('\x1b[33m' + (i === 0 ? ' *' : '**') + '\x1b[37m: ' + r));
	console.log('\x1b[34m' + (Date.now() - t) + 'ms');
}
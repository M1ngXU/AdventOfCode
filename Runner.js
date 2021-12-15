import Parser from './Input/Parser.js';

var execute = async (year, day, use_example) => (await import('./Code/' + year + '/' + (typeof day === 'number' && day < 10 ? '0' : '') + day + '.js'))
	.execute(Parser.parse_file(year, day, use_example));

var run = async (year, day, use_example) => {
	if (typeof day === 'number') day = (day < 10 ? '0' : '') + day;
	console.log('\x1b[34m' + year + '/' + day);
	var t = Date.now();
	(await execute(year, day, use_example))
		.forEach((r, i) => console.log('\x1b[33m' + ' '.repeat(1 - i) + '*'.repeat(i + 1) + '\x1b[37m: ' + r));
	console.log('\x1b[31m' + (Date.now() - t) + 'ms');
}

export {
	execute,
	run as default
}
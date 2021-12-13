const runner = require('./Runner');
const fs = require('fs');

var t = Date.now();
fs.readdirSync('Code').forEach(y => {
	fs.readdirSync('Code/' + y).forEach(d => {
		runner(y, d.split('.')[0]);
	});
});
console.log('\x1b[32mTotal time:', '\x1b[31m' + (Date.now() - t) + 'ms');
//runner(2021,13);
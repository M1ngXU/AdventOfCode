const runner = require('./Runner');

fs.readdirSync('Code').forEach(y => {
	fs.readdirSync('Code/' + y).forEach(d => {
		runner(y, d.split('.')[0]);
	});
});
//runner(2021,10);
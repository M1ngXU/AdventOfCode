import run, { execute, download, submit } from './ExerciseHelper.js';
import fs from 'fs';

(async () => {
	var t = Date.now();
	var years = fs.readdirSync('Code');
	for (var i = 0; i < years.length; i++) {
		var y = years[i];
		var days = fs.readdirSync('Code/' + y);
		for (var j = 0; j < days.length; j++) {
			var d = days[j].split('.')[0];
			await run(y, d);
		};
	}
	console.log('\x1b[32mTotal time:', '\x1b[31m' + (Date.now() - t) + 'ms');
})();
//runner(2021,16);
/*(async () => {
	var t = Date.now();
	var years = fs.readdirSync('Code');
	for (var i = 0; i < years.length; i++) {
		var y = years[i];
		var days = fs.readdirSync('Code/' + y);
		for (var j = 0; j < days.length; j++) {
			await download.example(y, days[j].split('.')[0]);
			await download.exercise(y, days[j].split('.')[0]);
		};
	}
	console.log('\x1b[32mTotal time:', '\x1b[31m' + (Date.now() - t) + 'ms');
})();*/
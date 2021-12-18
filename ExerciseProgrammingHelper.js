import fetch from 'node-fetch';
import fs from 'fs';
import { submit, execute, download } from './ExerciseHelper.js';

const FILE_TO_INPUT = './Input/';
const EXERCISE = 'Exercise/';
const EXAMPLE = 'Example/';

const year = 2021;
const day = '04';
const result = 1924;

(async () => {
	var file_to_exercise = FILE_TO_INPUT + EXERCISE + year + '/' + day + '.input';
	var file_to_example = FILE_TO_INPUT + EXAMPLE + year + '/' + day + '.input';
	try {
		fs.statSync(file_to_exercise);
	} catch {
		await download.exercise(year, day);
	} finally {
		try {
			fs.statSync(file_to_example);
		} catch {
			await download.example(year, day);
		} finally {
			var r = await execute(year, day, true);
			if (r === undefined || r === null) return console.log('Returned null or undefined.');
			if (result === r.at(-1)) {
				console.log('Assertion succeeded, calculating with real input ...');
				var t = Date.now();
				r = (await execute(year, day));
				console.log('Result:', r.at(-1), 'in', (Date.now() - t) + 'ms');
				console.log('Submitting ...');
				console.log(await submit(r.length, r.at(-1), year, day));
				
			} else {
				console.log('Error, expected', result, 'but received', r.at(-1));
			}
		}
	}
})();
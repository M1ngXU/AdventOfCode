import fetch from 'node-fetch';
import fs from 'fs';
import { decode } from 'html-entities';
import { execute } from './Runner.js';

const FILE_TO_INPUT = './Input/';
const EXERCISE = 'Exercise/';
const EXAMPLE = 'Example/';

const year = 2021;
const day = 14;
const result = [ 1588, 2188189693529 ];

(async () => {
	var file_to_exercise = FILE_TO_INPUT + EXERCISE + year + '/' + day + '.input';
	var file_to_example = FILE_TO_INPUT + EXAMPLE + year + '/' + day + '.input';
	try {
		fs.statSync(file_to_exercise);
	} catch {
		var input = await fetch('https://www.adventofcode.com/2021/day/' + day + '/input', {
			headers: {
				cookie: 'session=53616c7465645f5f7c8fffb0c940fa4b7afde3b5136cfc5071d8b914fcef9491d1092d659dd91671448bdfa5fa9245ef'
			}
		});
		input = await input.text();
		fs.writeFileSync(file_to_exercise, input.slice(0, -1));
		return;
	} finally {
		try {
			fs.statSync(file_to_example);
		} catch {
			var input = await fetch('https://www.adventofcode.com/2021/day/' + day);
			input = await input.text();
			fs.writeFileSync(file_to_example, decode(input.split('<code>')[1].split('</code>')[0]).slice(0, -1));
			return;
		} finally {
			var r = await execute(year, day, true);
			if (JSON.stringify(r) === JSON.stringify(result)) {
				console.log('Assertion succeeded, calculating with real input ...');
				r = (await execute(year, day)).at(-1);
				console.log('Result:', r);
			} else {
				console.log('Error, expected', result, 'but received', r);
			}
		}
	}
})();
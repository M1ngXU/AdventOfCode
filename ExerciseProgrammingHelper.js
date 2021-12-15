import fetch from 'node-fetch';
import fs from 'fs';
import { decode } from 'html-entities';
import { execute } from './Runner.js';

const FILE_TO_INPUT = './Input/';
const EXERCISE = 'Exercise/';
const EXAMPLE = 'Example/';

const year = 2020;
const day = '08';
const result = 8;

(async () => {
	var file_to_exercise = FILE_TO_INPUT + EXERCISE + year + '/' + day + '.input';
	var file_to_example = FILE_TO_INPUT + EXAMPLE + year + '/' + day + '.input';
	try {
		fs.statSync(file_to_exercise);
	} catch {
		var input = await fetch('https://www.adventofcode.com/' + year + '/day/' + parseInt(day) + '/input', {
			headers: {
				cookie: 'session=53616c7465645f5f7c8fffb0c940fa4b7afde3b5136cfc5071d8b914fcef9491d1092d659dd91671448bdfa5fa9245ef'
			}
		});
		input = await input.text();
		fs.writeFileSync(file_to_exercise, input.slice(0, -1));
	} finally {
		try {
			fs.statSync(file_to_example);
		} catch {
			var input = await fetch('https://www.adventofcode.com/' + year + '/day/' + parseInt(day));
			input = await input.text();
			console.log(input);
			fs.writeFileSync(file_to_example, decode(input.match(/<pre><code>(.+?)<\/code><\/pre>/s)[1].slice(0, -1)));
		} finally {
			var r = await execute(year, day, true);
			if (r === undefined || r === null) return console.log('Returned null or undefined.');
			if (result === r.at(-1)) {
				console.log('Assertion succeeded, calculating with real input ...');
				var t = Date.now();
				r = (await execute(year, day));
				console.log('Result:', r.at(-1), 'in', (Date.now() - t) + 'ms');
				console.log('Submitting ...');
				var p = new URLSearchParams();
				p.append('level', r.length);
				p.append('answer', r.at(-1));
				var res = await fetch('https://adventofcode.com/' + year + '/day/' + parseInt(day) + '/answer', {
					method: 'POST',
					body: p.toString(),
					headers: {
						'content-length': p.toString().length,
						'content-type': 'application/x-www-form-urlencoded',
						cookie: 'session=53616c7465645f5f7c8fffb0c940fa4b7afde3b5136cfc5071d8b914fcef9491d1092d659dd91671448bdfa5fa9245ef'
					}
				});
				console.log((await res.text()).match(/<article><p>(.+)<\/p>/)[1].replace(/<[^>]*>/g, ''));
				
			} else {
				console.log('Error, expected', result, 'but received', r.at(-1));
			}
		}
	}
})();
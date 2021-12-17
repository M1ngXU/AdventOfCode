import Parser from './Input/Parser.js';
import fs from 'fs';
import fetch from 'node-fetch';
import { decode } from 'html-entities';

var env = await fs.readFileSync('.env').toString().split('\n').map(e => e.split('=', 2)).reduce((a, b) => {
	a[b[0]] = b[1];
	return a;
}, {});

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

var download = {
	exercise: async (year, day) => {
		var input = await fetch('https://www.adventofcode.com/' + year + '/day/' + parseInt(day) + '/input', {
			headers: {
				cookie: 'session=' + env.session
			}
		});
		input = await input.text();
		fs.writeFileSync('./Input/Exercise/' + year + '/' + day + '.input', input.slice(0, -1));
	}, example: async (year, day) => {
		var input = await fetch('https://www.adventofcode.com/' + year + '/day/' + parseInt(day));
		input = await input.text();
		fs.writeFileSync('./Input/Example/' + year + '/' + day + '.input', decode(input.match(/<pre><code>(.+?)<\/code><\/pre>/s)[1].slice(0, -1)));
	}
}

var submit = async (level, result, year, day) => {
	var p = new URLSearchParams();
	p.append('level', level);
	p.append('answer', result);
	var res = await fetch('https://adventofcode.com/' + year + '/day/' + parseInt(day) + '/answer', {
		method: 'POST',
		body: p.toString(),
		headers: {
			'content-length': p.toString().length,
			'content-type': 'application/x-www-form-urlencoded',
			cookie: 'session=' + env.session
		}
	});
	return (await res.text()).match(/<article><p>(.+)<\/p>/)[1].replace(/<[^>]*>/g, '');
}

export {
	env,
	execute,
	run as default,
	download,
	submit
}
import { Sort } from './../../API.js';

export function execute(input_data) {
	var dict = {};
	input_data.split('\n\n')[1].split('\n').forEach(v => dict[v.split(' -> ')[0]] = v.split(' -> ')[1]);

	var fnAddToObj = (p, e, v) => !p[e] ? p[e] = v : p[e] += v;

	var poly = {};
	var start = input_data.split('\n\n')[0].split('');
	start.slice(1).forEach((c, i) => fnAddToObj(poly, start[i] + c, 1));

	var result = [];
	var fnPushResult = () => {
	    var chars = {};
	    Object.keys(poly).forEach(k => fnAddToObj(chars, k[1], poly[k]));
	    fnAddToObj(chars, start[0], 1);
	    chars = Object.values(chars).sort(Sort.Descending);
	    result.push(chars[0] - chars[chars.length - 1]);
	}

	for (var i = 0; i < 40; i++) {
	    if (i === 10) fnPushResult();
	    var new_poly = {};
	    Object.keys(poly).forEach(k => {
	        fnAddToObj(new_poly, k[0] + dict[k], poly[k]);
	        fnAddToObj(new_poly, dict[k] + k[1], poly[k]);
	    });
	    poly = new_poly;
	}
	fnPushResult();
	return result;
}
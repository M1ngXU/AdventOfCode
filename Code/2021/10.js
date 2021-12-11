module.exports = input_data => {
	const input = require('./../../Input/Parser.js').string_array(input_data);
	var result = input.map(i => {
		var r = [];
		var e = [];
		var g = [];
		var k = [];
		var ic = 0;
		i.forEach((c, j) => {
			if (c === '(') r.push(j);
			if (c === '[') e.push(j);
			if (c === '{') g.push(j);
			if (c === '<') k.push(j);
			if (c === ')') {
				if (r.length === 0) return ic = 3;
				var l = r.pop();
				if (e.find(v => v > l)) return ic = 3;
				if (g.find(v => v > l)) return ic = 3;
				if (k.find(v => v > l)) return ic = 3;
			};
			if (c === ']') {
				if (e.length === 0) return ic = 57;
				var l = e.pop();
				if (r.find(v => v > l)) return ic = 57;
				if (g.find(v => v > l)) return ic = 57;
				if (k.find(v => v > l)) return ic = 57;
			};
			if (c === '}') {
				if (g.length === 0) return ic = 1197;
				var l = g.pop();
				if (e.find(v => v > l)) return ic = 1197;
				if (r.find(v => v > l)) return ic = 1197;
				if (k.find(v => v > l)) return ic = 1197;
			};
			if (c === '>') {
				if (k.length === 0) return ic = 25137;
				var l = k.pop();
				if (e.find(v => v > l)) return ic = 25137;
				if (g.find(v => v > l)) return ic = 25137;
				if (r.find(v => v > l)) return ic = 25137;
			};
		});
		if (!ic) {
			r = r.map(v => ({ s: ')', n: v, c: 1 }));
			e = e.map(v => ({ s: ']', n: v, c: 2 }));
			g = g.map(v => ({ s: '}', n: v, c: 3 }));
			k = k.map(v => ({ s: '>', n: v, c: 4 }));
			var c = 0;
			[r, e, g, k].flat().sort((a, b) => b.n - a.n).forEach(v => c = c * 5 + v.c);
			return c;
		}
		return 0;
	}).filter(v => v !== 0).sort(require('./../../Util/Sort.js').Ascending);
	return [ result.length, result[(result.length - 1) / 2] ];
}
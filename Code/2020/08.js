export function execute(input_data) {
	var input = input_data.split('\n').map(i => i.split(' '));
	var fnSimulate = input => {
		var acc = 0;
		var passed = [];
		var line = 0;
		while (!passed.includes(line) && line < input.length) {
			passed.push(line);
			var c = input[line][0];
			var a = parseInt(input[line][1]);
			if (c === 'jmp') {
				line += a;
			} else {
				if (c === 'acc') acc += a;
				line++;
			}
		};
		return { a: acc, l: line };
	}
	for (var i = 0; i < input.length; i++) {
		if (input[i][0] !== 'acc') {
			var m_input = JSON.parse(JSON.stringify(input));
			m_input[i][0] = m_input[i][0] === 'jmp' ? 'nop' : 'jmp';
			var r = fnSimulate(m_input);
			if (r.l === m_input.length) return [ fnSimulate(input).a, r.a ];
		}
	}
}
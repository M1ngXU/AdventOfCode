export function execute(input_data) {
	var input = input_data.split('\n').map(i => i.split(/ |-|: /));
	var valid_one = 0;
	input.forEach(i => {
		var l = (i[3].match(new RegExp(i[2], 'g')) || []).length;
		if (parseInt(i[0]) <= l && l <= parseInt(i[1])) valid_one++;
	});
	var valid_two = 0;
	input.forEach(i => {
		var a = i[3][parseInt(i[0]) - 1] === i[2];
		var b = i[3][parseInt(i[1]) - 1] === i[2];
		if ((a || b) && a !== b) valid_two++;
	});
	return [ valid_one, valid_two ];
}
const SPACE_BTW_CHAR = 1;

const Matrix = require('./../../Util/Matrix.js');

module.exports = input_data => {
	var input = input_data.split('\n\n');
	var m = input[0].split('\n').map(v => v.split(',').map(v => parseInt(v)));
	var f = input[1].split('\n').map(v => v.split('along ')[1].split('='));
	
	var matrix = new Matrix({ default_value: 0 });
	m.forEach(m => matrix.setElement(m[0], m[1], 1, { create_imm: true }));

	var dots = 0;
	f.forEach(fold => {
		fold[1] = parseInt(fold[1]);
		var x = x => x;
		var y = y => y;
		var fold_x = fold[0] === 'x';
		if (fold_x) {
			x = x => 2 * fold[1] - x;
		} else {
			y = y => 2 * fold[1] - y;
		}
		matrix.elements.filter(e => e.coordinates[fold[0]] > fold[1])
			.forEach(e => matrix.addToElement(x(e.coordinates.x), y(e.coordinates.y), e.value, { max: 1 }));
		matrix[ fold_x ? 'set_width' : 'set_height' ](fold[1]);
		
		if (!dots) dots = matrix.values.sum;
	});
	return [
		dots,
		'\n' + matrix.toString({ length_per_value: 1, default_value: ' ' }).split('\n')
				.map(v => v.replace(/1/g,'█').match(/.{1,5}/g).join(' '.repeat(SPACE_BTW_CHAR))).join('\n')
	];
}
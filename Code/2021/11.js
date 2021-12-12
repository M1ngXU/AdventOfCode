module.exports = input_data => {
	const input = require('./../../Input/Parser.js').matrix(input_data);

	var step_to_flash;

	var flashes = 0;
	for (var j = 0; j < 100 || step_to_flash === undefined; j++) {
		input.matrix.forEach(i => i.value++);
		var about_to_flash = input.matrix.filter(i => i.value > 9);
		while (about_to_flash.length > 0) {
			var e = about_to_flash.pop();
			e.getAdjacent({ full_element: true, diagonal: true }).forEach(i => {
				if (i.value > 9) return;
				i.value++;
				if (i.value > 9) about_to_flash.push(i);
			});
		}
		input.matrix.filter(i => i.value > 9).forEach(i => i.value = 0);
		if (!input.matrix.find(e => e.value > 0)) step_to_flash = j;
		if (j < 100) flashes += input.matrix.filter(i => i.value === 0).length;
	}
	return [ flashes, step_to_flash + 1 ]
}
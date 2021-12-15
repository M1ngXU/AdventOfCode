export function execute(input_data) {
	var input = input_data.split('\n').map(i => parseInt(i));
	var result = [];
	for (var x = 0; x < input.length; x++) {
		for (var y = 0; y < input.length; y++) {
			if (x !== y) {
				if (input[x] + input[y] === 2020) result[0] = input[x] * input[y];
				for (var z = 0; z < input.length; z++) {
					if (y !== z && x !== z && input[x] + input[y] + input[z] === 2020) result[1] = input[x] * input[y] * input[z];
				}
			}
		}
	}
	return result;
}
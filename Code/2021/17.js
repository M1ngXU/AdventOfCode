import { Parser, Graph, M_Set, Matrix, Number_Array, Sort, Vector } from './../../API.js';

var fnSimulate = (velocity, target) => {
	var pos = [ 0, 0 ];
	while (pos[1] >= target[1][0]) {
		pos[0] += velocity[0];
		pos[1] += velocity[1]--;
		if (pos[0] >= target[0][0] && pos[0] <= target[0][1] && pos[1] >= target[1][0] && pos[1] <= target[1][1]) return true;
		if (velocity[0] > 0) velocity[0]--;
	}
	return false;
}

export function execute(input_data) {
	var target = input_data.match(/[0-9\-]+..[0-9\-]+/g).map(v => v.split('..').map(v => parseInt(v)));
	var different_velocities = 0;
	var max_y = -target[1][0] - 1;
	for (var x = 1; x <= target[0][1]; x++) {
		for (var y = target[1][0]; y <= max_y; y++) {
			var position = [ 0, 0 ];
			var velocity = [ x, y ];
			var inside_target = false
			while (position[1] >= target[1][0] && !inside_target) {
				position[0] += velocity[0];
				position[1] += velocity[1]--;
				if (
						position[0] >= target[0][0]
						&& position[0] <= target[0][1]
						&& position[1] >= target[1][0]
						&& position[1] <= target[1][1]
				) inside_target = true;
				if (velocity[0] > 0) velocity[0]--;
			}
			if (inside_target) different_velocities++;
		}
	}
	return [ max_y * (max_y + 1) / 2, different_velocities ];
}
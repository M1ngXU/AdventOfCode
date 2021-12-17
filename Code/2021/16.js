const VERSION_LENGTH = 3;
const TYPE_LENGTH = 3;
const SUBPACKAGE_TYPE_0_LENGTH = 15;
const SUBPACKAGE_TYPE_1_LENGTH = 11;

var fnToDecFromBin = bin => parseInt(bin, 2);
var value_by_type = [
	pkg => pkg.sub_packages.reduce((a, p) => a + p.value, 0),
	pkg => pkg.sub_packages.reduce((a, p) => a * p.value, 1),
	pkg => Math.min(...pkg.sub_packages.map(p => p.value)),
	pkg => Math.max(...pkg.sub_packages.map(p => p.value)),
	pkg => {
		var num = '';
		do {
			var five_bit_sequence = pkg.unshift(5);
			num += five_bit_sequence.slice(1);
		} while (five_bit_sequence[0] === '1');
		return fnToDecFromBin(num);
	},
	pkg => pkg.sub_packages[0].value > pkg.sub_packages[1].value ? 1 : 0,
	pkg => pkg.sub_packages[0].value < pkg.sub_packages[1].value ? 1 : 0,
	pkg => pkg.sub_packages[0].value === pkg.sub_packages[1].value ? 1 : 0
];

var fnDecodePkg = bit_sequence => {
	if (bit_sequence.length < 8) return;
	var pkg = {};
	pkg.bit_sequence_left = bit_sequence;
	pkg.unshift = amount => {
		var removed = pkg.bit_sequence_left.slice(0, amount);
		pkg.bit_sequence_left = pkg.bit_sequence_left.slice(amount);
		return removed;
	}
	pkg.version = fnToDecFromBin(pkg.unshift(VERSION_LENGTH));
	var type = fnToDecFromBin(pkg.unshift(TYPE_LENGTH));
	if (type !== 4) {
		var length_type = parseInt(pkg.unshift(1));
		pkg.sub_packages = [];
		if (length_type === 0) {
			var sub_pkg_length = fnToDecFromBin(pkg.unshift(SUBPACKAGE_TYPE_0_LENGTH));
			var sub_package_bit_sequence = pkg.unshift(sub_pkg_length);
			do {
				var p = fnDecodePkg(sub_package_bit_sequence);
				pkg.sub_packages.push(p);
				sub_package_bit_sequence = p.bit_sequence_left;
			} while (sub_package_bit_sequence.length > 0);
		} else {
			var sub_pkg_amount = fnToDecFromBin(pkg.unshift(SUBPACKAGE_TYPE_1_LENGTH));
			var s = pkg.bit_sequence_left;
			for (var i = 0; i < sub_pkg_amount; i++) {
				var p = fnDecodePkg(s);
				pkg.sub_packages.push(p);
				s = p.bit_sequence_left;
			}
			pkg.bit_sequence_left = s;
		}
	}
	pkg.value = value_by_type[type](pkg);
	return pkg;
}

export function execute(input_data) {
	var bin = input_data.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
	var p = fnDecodePkg(bin);
	var q = [ p ];
	var v = 0;
	while (q.length > 0) {
		var e = q.pop();
		v += e.version;
		if (e.sub_packages) {
			q = q.concat(e.sub_packages);
		}
	}
	return [ v, p.value ];
}
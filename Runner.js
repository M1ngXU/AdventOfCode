module.exports = (year, day, use_example) => {
	console.log(year + '/' + day);
	require('./Code/' + year + '/' + day + '.js')(use_example)
		.forEach((r, i) => console.log((i + 1) + ':', r));
}
export default {
	Ascending: (a, b) => a - b,
	Descending: (a, b) => b - a,
	AscendingKey: key => (a, b) => a[key] - b[key],
	DescendingKey: key => (a, b) => b[key] - a[key]
}
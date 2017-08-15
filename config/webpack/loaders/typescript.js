module.exports = {
	loader: 'ts-loader',
	test: function(path) {
		let isTest = (path.substr(path.length - 8) == '.spec.ts');
		let isTypescript = (path.substr(path.length - 3) == '.ts');
		let isTsx = (path.substr(path.length - 4) == '.tsx');

		return (isTypescript || isTsx) && !isTest;
	},
}

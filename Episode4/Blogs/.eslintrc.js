module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
		es6: true,
		jest: true,
	},
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: "latest",
	},
}

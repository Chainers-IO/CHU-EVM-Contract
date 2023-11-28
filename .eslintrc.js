module.exports = {
	extends: ["airbnb-base", "plugin:prettier/recommended", "eslint:recommended"],
	env: {
		node: true,
		es2021: true,
		jest: true,
		es2022: true,
	},
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: 13,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		quotes: ["error", "double"],
		strict: 0,
		"no-underscore-dangle": 0,
		"consistent-return": ["warn"],
		"no-await-in-loop": ["warn"],
		"no-param-reassign": ["error", { props: true, ignorePropertyModificationsForRegex: [".*"] }],
		"prefer-destructuring": [
			"error",
			{
				array: false,
				object: true,
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		"init-declarations": ["error"],
		"no-restricted-imports": [
			"error",
			{
				patterns: [".*"],
			},
		],
		"arrow-body-style": [2, "as-needed"],
		"no-console": [
			"error",
			{
				allow: ["error"],
			},
		],
		"no-unexpected-multiline": "error",
	},
};

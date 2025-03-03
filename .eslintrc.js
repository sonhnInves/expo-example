module.exports = {
    extends: ["plugin:react/recommended", "prettier"],
    ignorePatterns: ["node_modules/", "babel.config.js", "metro.config.js","plugin:@typescript-eslint/recommended"],
    rules: {
        "prettier/prettier": ["error"],
    },
    plugins: ["@typescript-eslint"],
    parser: "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: "module",
    },
};

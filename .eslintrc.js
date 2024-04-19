module.exports = {
  env: {
    browser: false, // Set to false as you're using Node.js primarily
    commonjs: true, // Support for CommonJS
    es2021: true, // ECMAScript 2021 capabilities
    node: true, //
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 12, // Supports ES2021 features
    sourceType: "script", // Use "module" if using ES6 modules
  },
  rules: {
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};

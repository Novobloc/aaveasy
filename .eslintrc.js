module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": 0,
    quotes: ["warn", "double"],
    semi: ["warn", "always"]
  }
};

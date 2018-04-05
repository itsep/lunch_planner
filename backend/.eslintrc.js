module.exports = {
  "extends": "airbnb-base",
  "env": {
      "node": true,
      "mocha": true,
  },
  "rules": {
    // disallow semicolon at the end of the line
    "semi": ["error", "never"],
    // requires a dangling comma
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
  }
};

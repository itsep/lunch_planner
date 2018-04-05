module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
  },
  "rules": {
    // allow jsx in javascript files
    "react/jsx-filename-extension": 0,
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

module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    // allow jsx in javascript files
    'react/jsx-filename-extension': 0,
    // disallow semicolon at the end of the line
    semi: ['error', 'never'],
    // requires a dangling comma
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'linebreak-style': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
  settings: {
    'import/resolver': 'webpack',
  },
}

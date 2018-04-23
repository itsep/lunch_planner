module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    mocha: true,
  },
  globals: {
    expect: true,
    sinon: true,
  },
  rules: {
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
  },
}

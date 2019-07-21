module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    semi: [2, 'always'],
    'no-multiple-empty-lines': [2, {max: 2}],
    'no-prototype-builtins': 0,
    'no-console': 0
  }
}

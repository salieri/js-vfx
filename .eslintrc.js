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
    'no-console': 0,

    'vue/html-quotes': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 0,
    'vue/attributes-order': 0,
    'vue/multiline-html-element-content-newline': 0
  }
};

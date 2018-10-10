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
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // 取消强制执行每行的最大属性数
    'vue/max-attributes-per-line': 0,
    // 允许空标签
    'vue/html-self-closing': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止弹窗
    'no-alert': 2,
    // 箭头函数必须有空格
    'arrow-spacing': 'error',
    // 函数定义时括号前面必须有空格
    'space-before-function-paren': [
      'error',
      'always'
    ],
    // 禁止使用var
    'no-var': 2,
    // 使用单引号
    'quotes': [
      'error',
      'single'
    ],
    // 代码末尾不加分号
    'semi': [
      'error',
      'never'
    ]
  }
}

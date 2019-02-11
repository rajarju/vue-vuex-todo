module.exports = {
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
};

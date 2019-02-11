import Vue from 'vue';
import App from '../../../src/App';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('App.spec.js', () => {
  let cmp,
    vm;

  const dom = new JSDOM('', {
    url: 'http://localhost',
  });

  beforeEach(() => {
    cmp = Vue.extend(App);
    vm = new cmp({
      data: {},
    }).$mount();
  });

  it('equals messages to ["Cat"]', () => {
    expect(vm.$el).toEqual(['Cat']);
  });
});

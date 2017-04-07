/**
 * Created by duanchangteng on 2017/4/6.
 */

import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});

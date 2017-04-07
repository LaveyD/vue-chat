/**
 * Created by duanchangteng on 2017/4/6.
 */


import Vue from 'vue';
import Vuex from 'vuex';

import { INIT_DATA, SEND_MESSAGE } from './mutations-types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      name: '123',
      id: 1,
    },
    sessions: [
      {
        id: 1,
        name: 'default',
        allUsers: [1],
        messages: [
          {
            user: 'sys',
            content: 'welcome',
            date: new Date(),
          },
        ],
      },
    ],
    currentSessionId: 1,
    filterKey: '',
  },
  mutations: {
    [INIT_DATA]({ sessions, currentSessionId }, { user, message }) {
      const session = sessions.find(item => item.id === currentSessionId);
      session.messages.push({
        user,
        content: message,
        date: new Date(),
      });
    },
  },
  actions: {
    [SEND_MESSAGE]({ commit, state }, message) {
      const user = state.user.name;
      commit('INIT_DATA', { user, message });
    },
  },
});

export default store;

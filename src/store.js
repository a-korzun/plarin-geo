import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import data from './data.json';

export default new Vuex.Store({
  state: {
    data: data.data,
    filter: ''
  },
  mutations: {
    updateFilter(state, filter) {
      if (!filter.trim().length) {
        state.filter = '';
      } else {
        state.filter = filter;
      }
    }
  },
  actions: {
    updateList(context) {
      context.commit('updateFilter');
    }
  }

});
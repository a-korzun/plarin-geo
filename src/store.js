import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    filter: ''
  },
  mutations: {
    updateFilter(state, filter) {
      state.filter = filter;
    },
    loadData(state, data) {
      state.data = data;
    }
  }
});

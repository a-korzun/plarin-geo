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
      if (!filter.trim().length) {
        state.filter = '';
      } else if (/([^0-9а-яА-ЯЁё,\s-'])/.test(filter)) {
        state.filter = null;
      } else {
        state.filter = filter;
      }
    },
    loadData(state, data) {
      state.data = data;
    }
  }
});

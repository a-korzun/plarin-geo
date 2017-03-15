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
      if (!filter.trim().length || /([^A-Za-z0-9а-яА-ЯЁё])/.test(filter)) {
        state.filter = '';
      } else {
        state.filter = filter;
      }
    },
    loadData(state, data) {
      state.data = data;
    }
  }
});

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';

import store from './store';

new Vue({
    el: '#root',
    components: { App },
    template: `<App></App>`,
    store,
});
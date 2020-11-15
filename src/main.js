import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import Store from "./store";
import Router from "./routes";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;


new Vue({
    render: h => h(App),
    router: Router,
    store: Store
}).$mount('#app');

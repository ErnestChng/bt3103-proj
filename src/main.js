import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import routes from "./routes.js";
import BootstrapVue from "bootstrap-vue";
import Store from "./store";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

new Vue({
    render: h => h(App),
    router: router,
    store: Store
}).$mount('#app');

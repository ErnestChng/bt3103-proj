import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import routes from "./routes.js";
import VueGoogleMap from 'vuejs-google-maps';

Vue.use(VueRouter);
Vue.use(VueGoogleMap, {
    load: {
        apiKey: 'your-api-key',
        libraries: ['...']
    }
});

Vue.config.productionTip = false;

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app');

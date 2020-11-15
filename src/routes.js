import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import News from "./components/pages/news/News";
import Map from "./components/pages/map/Map";
import Forum from "./components/pages/forum/Forum";
import Contact from "./components/pages/contact/Contact";
import ForumThread from "./components/pages/forum/ForumThread"

import Error from "./components/pages/error/Error";
import VueRouter from "vue-router";
import Store from "./store";

const routes = [
    {path: '/', meta: {requiresAuth: false}, component: Home},
    {path: '/register', meta: {requiresAuth: false}, component: Register},
    {path: '/login', meta: {requiresAuth: false}, component: Login},
    {path: '/about', meta: {requiresAuth: true}, component: About},
    {path: '/news', meta: {requiresAuth: true}, component: News},
    {path: '/map', meta: {requiresAuth: true}, component: Map},
    {path: '/forum', meta: {requiresAuth: true}, component: Forum},
    {path: '/contact', meta: {requiresAuth: true}, component: Contact},
    {path: '*', meta: {requiresAuth: false}, component: Error},
    {path: '/thread', component: ForumThread}
];

const validRoutes = routes.map((e) => e.path);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.fullPath !== '*' && validRoutes.includes(to.fullPath)) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (Store.state.user.loggedIn) {
                next();
            } else {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                });
            }
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;

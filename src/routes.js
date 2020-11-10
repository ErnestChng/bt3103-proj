import Default from "./components/pages/default/Default";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import News from "./components/pages/news/News";
import Map from "./components/pages/map/Map";
import Forum from "./components/pages/forum/Forum";
import Contact from "./components/pages/contact/Contact";

export default [
    {path: '/', component: Default},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/home', component: Home},
    {path: '/about', component: About},
    {path: '/news', component: News},
    {path: '/map', component: Map},
    {path: '/forum', component: Forum},
    {path: '/contact', component: Contact}
];
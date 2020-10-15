import Home from "./components/Home";
import About from "./components/About";
import News from "./components/News";
import Map from "./components/Map";
import Forum from "./components/Forum";
import Contact from "./components/Contact";

export default [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/news', component: News},
    {path: '/map', component: Map},
    {path: '/forum', component: Forum},
    {path: '/contact', component: Contact}
];
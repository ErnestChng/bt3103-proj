import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import News from "./components/pages/news/News";
import Map from "./components/pages/map/Map";
import Forum from "./components/pages/forum/Forum";
import Contact from "./components/pages/contact/Contact";
import ForumThread from "./components/pages/forum/ForumThread"

export default [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/news', component: News},
    {path: '/map', component: Map},
    {path: '/forum', component: Forum},
    {path: '/contact', component: Contact},
    {path: '/thread', component: ForumThread}
];
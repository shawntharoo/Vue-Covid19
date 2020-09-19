import DisplayChart from './components/DisplayChart.vue';
import Home from './components/Home.vue';
import Header from './components/Header.vue';

export const routes = [
    { path: '', name: 'home', components: {
        default: Home,
        'header-top': Header
    } },
    { path: '/dashboard', components: {
        default: DisplayChart,
        'header-top': Header
    } },
    { path: '/redirect-me', redirect: { name: 'home' } },
    { path: '*', redirect: '/' }
];
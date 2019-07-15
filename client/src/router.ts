import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Create from './views/Create.vue';
import Snippet from './views/Snippet.vue';

Vue.use( Router );

export default new Router( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/snippet/:id',
      name: 'snippet',
      component: Snippet
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue' ),
    },
  ],
} );

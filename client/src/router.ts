import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Auth from './views/Auth.vue';
import SnippetCreate from './views/SnippetCreate.vue';
import SnippetView from './views/SnippetView.vue';
import SnippetEdit from './views/SnippetEdit.vue';

Vue.use( Router );

export default new Router( {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/snippet/create',
      name: 'snippet-create',
      component: SnippetCreate
    },
    {
      path: '/snippet/:id',
      name: 'snippet-view',
      component: SnippetView
    },
    {
      path: '/snippet/edit/:id',
      name: 'snippet-edit',
      component: SnippetEdit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue' )
    }
  ]
} );

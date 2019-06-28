import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';

import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import './assets/styles/tailwind.scss';
Vue.config.productionTip = false;

new Vue( {
    store,
    render: ( h ) => h( App )
} ).$mount( '#app' );

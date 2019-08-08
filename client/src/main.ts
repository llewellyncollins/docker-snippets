import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'vuetify/src/stylus/app.styl';
import 'firebaseui/dist/firebaseui.css';

// TODO: Only import the required components
Vue.use( Vuetify, {
    iconfont: 'md',
    theme: {
        primary: '#3f51b5',
        secondary: '#03a9f4',
        accent: '#607d8b',
        error: '#f44336',
        warning: '#ff5722',
        info: '#2196f3',
        success: '#4caf50'
    }
} );

const firebaseConfig = {
    apiKey: 'AIzaSyC6cTNDv3SJ1hSWiENsgVe90-BWMCBwcOA',
    authDomain: 'docker-snippets.firebaseapp.com',
    databaseURL: 'https://docker-snippets.firebaseio.com',
    projectId: 'docker-snippets',
    storageBucket: 'docker-snippets.appspot.com',
    messagingSenderId: '681353270380',
    appId: '1:681353270380:web:6f7e2501b670890d'
};

new Vue( {
    router,
    store,
    render: ( h ) => h( App ),
    created() {
        firebase.initializeApp( firebaseConfig );

        firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user ) {
                this.$store.dispatch( 'user/setUserLoggedInStatus', true );
                this.$store.dispatch( 'user/setUserName', user.displayName );
                this.$store.dispatch( 'user/setUserEmail', user.email );
                this.$store.dispatch( 'user/setUserId', user.uid );
                this.$router.push( '/' );
            } else {
                this.$store.dispatch( 'user/setUserLoggedInStatus', false );
                this.$router.push( '/auth' );
            }

            this.$store.dispatch( 'setReadyState', true );
        } );
    }
} ).$mount( '#app' );



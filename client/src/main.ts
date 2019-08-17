import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueClipboard from 'vue-clipboard2';

import firebase from './firebase';

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

Vue.use( VueClipboard );

new Vue( {
    router,
    store,
    render: ( h ) => h( App ),
    created() {
        firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user ) {
                this.$store.dispatch( 'user/setUserLoggedInStatus', true );
                this.$store.dispatch( 'user/setUserName', user.displayName );
                this.$store.dispatch( 'user/setUserEmail', user.email );
                this.$store.dispatch( 'user/setUserId', user.uid );
                this.$store.dispatch( 'snippets/loadStarredSnippets', user.uid );
            } else {
                this.$store.dispatch( 'user/setUserLoggedInStatus', false );
                this.$router.push( '/auth' );
            }

            this.$store.dispatch( 'setReadyState', true );
        } );
    }
} ).$mount( '#app' );



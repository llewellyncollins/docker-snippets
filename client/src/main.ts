import Vue from 'vue';
import Vuetify from 'vuetify/lib';

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

new Vue( {
    router,
    store,
    created() {
        firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user ) {
                this.$store.dispatch( 'user/updateUserLoggedIn', true );
                this.$store.dispatch( 'user/updateUserDetails', {
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName
                } );
                this.$router.push( '/' );
            } else {
                this.$store.dispatch( 'user/updateUserLoggedIn', false );
                this.$router.push( '/auth' );
            }

            this.$store.dispatch( 'updateReadyState', true );
        } );
    },
    render: ( h ) => h( App )
} ).$mount( '#app' );



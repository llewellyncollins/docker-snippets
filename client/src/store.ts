import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';

Vue.use( Vuex );

const firebaseConfig = {
  apiKey: 'AIzaSyC6cTNDv3SJ1hSWiENsgVe90-BWMCBwcOA',
  authDomain: 'docker-snippets.firebaseapp.com',
  databaseURL: 'https://docker-snippets.firebaseio.com',
  projectId: 'docker-snippets',
  storageBucket: 'docker-snippets.appspot.com',
  messagingSenderId: '681353270380',
  appId: '1:681353270380:web:6f7e2501b670890d'
};

firebase.initializeApp( firebaseConfig );

const fireBaseFunctions = firebase.functions();
const addSnippetFunc = fireBaseFunctions.httpsCallable( 'addSnippet' );

export default new Vuex.Store( {
  state: {
    snippet: {},
    snippets: {}
  },
  mutations: {
    SET_SNIPPET ( state, snippet ) {
      state.snippet = snippet;
    }
  },
  actions: {
    addSnippet ( { commit }, snippet ) {
      return addSnippetFunc( snippet ).then( ( response ) => {
        commit( 'SET_SNIPPET', response.data );
      } );
    }
  },
} );

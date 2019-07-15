import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import Snippet from '../../interfaces/Snippet';

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
const getSnippetsFunc = fireBaseFunctions.httpsCallable( 'getSnippets' );
const addSnippetFunc = fireBaseFunctions.httpsCallable( 'addSnippet' );

const snippets: Snippet[] = [];
const snippet: Snippet = {};

export default new Vuex.Store( {
  state: {
    snippet,
    snippets
  },
  mutations: {
    SET_SNIPPETS ( state, newSnippets: Snippet[] ) {
      state.snippets = newSnippets;
    },
    SET_SNIPPET ( state, id ) {
      // TODO: Error if not found
      state.snippet = state.snippets.filter( ( s ) => { return s.id === id; } )[ 0 ];
    }
  },
  actions: {
    setSnippets ( { commit } ) {
      return getSnippetsFunc( {
        name: '',
        tag: '',
        limit: 10
      } ).then( ( response ) => {
        commit( 'SET_SNIPPETS', response.data );
      } );
    },
    addSnippet ( { commit }, snippet ) {
      return addSnippetFunc( snippet ).then( ( response ) => {
        commit( 'SET_SNIPPET', response.data );
      } );
    },
    setSnippet ( { commit }, id ) {
      // TODO: Get snippet from the server
      commit( 'SET_SNIPPET', id );
    }
  },
} );

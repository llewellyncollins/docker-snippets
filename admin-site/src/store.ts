import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import Tag from '../../interfaces/Tag';

Vue.use( Vuex );

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp( firebaseConfig );

const fireBaseFunctions = firebase.functions();
const getTagsFunc = fireBaseFunctions.httpsCallable( 'getTags' );
const addTagFunc = fireBaseFunctions.httpsCallable( 'addTag' );
const deleteTagFunc = fireBaseFunctions.httpsCallable( 'deleteTag' );

const tags: Tag[] = [];
const snippets: object[] = [];

export default new Vuex.Store( {
    state: {
        tags,
        snippets
    },
    mutations: {
        ADD_TAGS ( state, newTags ) {
            state.tags = state.tags.concat( newTags );
        },
        ADD_TAG ( state, tag ) {
            state.tags.push( tag );
        },
        REMOVE_TAG ( state, id ) {
            state.tags = state.tags.filter( ( tag ) => tag.id !== id );
        }
    },
    actions: {
        getTags ( { commit, dispatch } ) {
            return getTagsFunc( 100 ).then( ( response ) => {
                commit( 'ADD_TAGS', response.data );
            } );
        },
        addTag ( { commit }, name ) {
            return addTagFunc( { name } ).then( ( { data } ) => {
                commit( 'ADD_TAG', data );
            } );
        },
        deleteTag ( { commit }, id ) {
            return deleteTagFunc( id ).then( () => {
                commit( 'REMOVE_TAG', id );
            } );
        }
    },
} );

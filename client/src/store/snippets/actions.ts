import firebase from '../../firebase';
import { ActionTree } from 'vuex';
import { RootState, SnippetsState } from '../interfaces';
import Snippet from '../../../../interfaces/Snippet';

const fireBaseFunctions = firebase.functions();
const getSnippetsFunc = fireBaseFunctions.httpsCallable( 'getSnippets' );
const getSnippetFunc = fireBaseFunctions.httpsCallable( 'getSnippet' );
const addSnippetFunc = fireBaseFunctions.httpsCallable( 'addSnippet' );

export const actions: ActionTree<SnippetsState, RootState> = {
    loadSnippets ( { commit } ) {
        return getSnippetsFunc( {
            name: '',
            tag: '',
            limit: 10
        } ).then( ( response ) => {
            const payload: Snippet[] = response && response.data;
            commit( 'SET_SNIPPETS', payload );
        } );
    },
    loadSnippet ( { commit, state }, id ) {
        return getSnippetFunc( { id } ).then( ( response ) => {
            const payload: Snippet = response && response.data;
            commit( 'SET_SNIPPET', payload );
            return payload;
        } );
    },
    addSnippet ( { commit }, snippet ) {
        return addSnippetFunc( snippet ).then( ( response ) => {
            const payload: Snippet = response && response.data;
            commit( 'SET_SNIPPET', payload );
        } );
    }
};

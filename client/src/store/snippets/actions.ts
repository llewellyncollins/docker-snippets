import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { RootState, SnippetsState } from '../interfaces';
import Snippet from '../../../../interfaces/Snippet';

export const actions: ActionTree<SnippetsState, RootState> = {
    loadSnippets( { commit } ) {
        return firebase.functions().httpsCallable( 'getSnippets' )( {
            name: '',
            tag: '',
            limit: 10
        } ).then( ( response ) => {
            const payload: Snippet[] = response && response.data;
            commit( 'SET_SNIPPETS', payload );
        } );
    },
    loadSnippet( { commit, state }, id ) {
        return firebase.functions().httpsCallable( 'getSnippet' )( { id } ).then( ( response ) => {
            const payload: Snippet = response && response.data;
            commit( 'SET_SNIPPET', payload );
            return payload;
        } );
    },
    addSnippet( { commit }, snippet ) {
        return firebase.functions().httpsCallable( 'addSnippet' )( snippet ).then( ( response ) => {
            const payload: Snippet = response && response.data;
            commit( 'SET_SNIPPET', payload );
        } );
    },
    editSnippet( { commit }, snippet ) {
        return firebase.functions().httpsCallable( 'editSnippet' )( snippet ).then( ( response ) => {
            const payload: Snippet = response && response.data;
            commit( 'SET_SNIPPET', payload );
        } );
    }
};

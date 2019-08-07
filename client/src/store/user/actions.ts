import { ActionTree } from 'vuex';
import { RootState, UserState } from '../interfaces';
import firebase from 'firebase/app';

export const actions: ActionTree<UserState, RootState> = {
    updateUserLoggedIn( { commit }, status: boolean ) {
        commit( 'SET_LOGGED_IN_STATUS', status );
    },
    updateUserDetails( { commit }, payload ) {
        commit( 'SET_USER_DETAILS', payload );
    },
    signOut( { commit } ) {
        return firebase.auth().signOut()
            .then( () => {
                commit( 'SET_LOGGED_IN_STATUS', false );
                commit( 'CLEAR_USER_DETAILS' );
            } )
            .catch( () => {
                // TODO: Handle error
            } );
    }
};

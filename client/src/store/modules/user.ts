import firebase from 'firebase/app';
import { Store } from 'vuex';

interface State {
    isLoggedIn: boolean;
    displayName?: string;
    email?: string;
    uid?: string;
}

const defaultState: State = {
    isLoggedIn: false,
    uid: undefined,
    email: undefined,
    displayName: undefined
};

export default {
    namespaced: true,
    state: defaultState,
    mutations: {
        setLoggedInStatus( state: State, isUserLoggedIn: boolean ) {
            state.isLoggedIn = isUserLoggedIn;
        },
        setUserName( state: State, name: string ) {
            state.displayName = name;
        },
        setUserEmail( state: State, email: string ) {
            state.email = email;
        },
        setUserId( state: State, id: string ) {
            state.uid = id;
        },
        clearUserDetails( state: State ) {
            state.uid = undefined;
            state.displayName = undefined;
            state.email = undefined;
        }
    },
    actions: {
        setUserLoggedInStatus( { commit }: Store<State>, isUserLoggedIn: boolean ) {
            commit( 'setLoggedInStatus', isUserLoggedIn );
        },
        setUserName( { commit }: Store<State>, name: string ) {
            commit( 'setUserName', name );
        },
        setUserEmail( { commit }: Store<State>, email: string ) {
            commit( 'setUserEmail', email );
        },
        setUserId( { commit }: Store<State>, id: string ) {
            commit( 'setUserId', id );
        },
        signOut( { commit }: Store<State> ) {
            return firebase.auth().signOut()
                .then( () => {
                    commit( 'setLoggedInStatus', false );
                    commit( 'clearUserDetails' );
                } )
                .catch( () => {
                    // TODO: Handle error
                } );
        }
    },
    getters: {
        isUserLoggedIn( state: State ) {
            return state.isLoggedIn;
        },
        userDetails( state: State ) {
            return {
                name: state.displayName,
                email: state.email,
                id: state.uid
            };
        }
    }
};

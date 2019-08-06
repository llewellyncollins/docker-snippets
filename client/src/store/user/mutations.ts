import { MutationTree } from 'vuex';
import { UserState } from '../interfaces';

export const mutations: MutationTree<UserState> = {
    SET_LOGGED_IN_STATUS( state, status: boolean ) {
        state.isLoggedIn = status;
    },
    SET_USER_DETAILS( state, payload ) {
        state.id = payload.id;
        state.displayName = payload.displayName;
        state.email = payload.email;
    },
    CLEAR_USER_DETAILS( state ) {
        state.id = undefined;
        state.displayName = undefined;
        state.email = undefined;
    }
};

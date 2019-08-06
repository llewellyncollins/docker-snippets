import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState, UserState } from '../interfaces';

export const state: UserState = {
    isLoggedIn: false,
    uid: undefined,
    email: undefined,
    displayName: undefined
};

const namespaced: boolean = true;

export const user: Module<UserState, RootState> = {
    namespaced,
    state,
    actions,
    mutations
};

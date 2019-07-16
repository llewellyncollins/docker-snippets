import { Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState, SnippetsState } from '../interfaces';

export const state: SnippetsState = {
    selectedSnippet: undefined,
    snippetList: undefined
};

const namespaced: boolean = true;

export const snippets: Module<SnippetsState, RootState> = {
    namespaced,
    state,
    actions,
    mutations
};

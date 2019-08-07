import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import { RootState } from './interfaces';
import { snippets } from './snippets/index';
import { user } from './user/index';

Vue.use( Vuex );

const store: StoreOptions<RootState> = {
  state: {
    version: '0.1.0',
    ready: false,
    loading: false
  },
  actions: {
    setReadyState( { commit }, status ) {
      commit( 'setReadyState', status );
    }
  },
  mutations: {
    setReadyState( state, status ) {
      state.ready = status;
    }
  },
  getters: {
    ready( state ) {
      return state.ready;
    },
    loading( state ) {
      return state.loading;
    }
  },
  modules: {
    snippets,
    user
  }
};

export default new Vuex.Store<RootState>( store );

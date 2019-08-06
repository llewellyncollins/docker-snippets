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
    ready: false
  },
  actions: {
    updateReadyState( { commit }, status ) {
      commit( 'SET_READY_STATE', status );
    }
  },
  mutations: {
    SET_READY_STATE( state, status ) {
      state.ready = status;
    }
  },
  modules: {
    snippets,
    user
  }
};

export default new Vuex.Store<RootState>( store );

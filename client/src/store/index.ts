import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import { RootState } from './interfaces';
import { snippets } from './snippets/index';

Vue.use( Vuex );

const store: StoreOptions<RootState> = {
  state: {
    version: '0.1.0'
  },
  modules: {
    snippets
  }
};

export default new Vuex.Store<RootState>( store );

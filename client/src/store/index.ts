import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import 'firebase/app';
import 'firebase/functions';
import 'firebase/firestore';
import { RootState } from './interfaces';
import { snippets } from './snippets/index';

Vue.use( Vuex );

const store: StoreOptions<RootState> = {
  modules: {
    snippets
  }
};

export default new Vuex.Store<RootState>( store );
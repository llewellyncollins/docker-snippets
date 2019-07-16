import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import colors from 'vuetify/es5/util/colors';

Vue.use( Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#3f51b5',
    secondary: '#03a9f4',
    accent: '#607d8b',
    error: '#f44336',
    warning: '#ff5722',
    info: '#2196f3',
    success: '#4caf50'
  }
} );

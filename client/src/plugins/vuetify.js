
// import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#03a9f4',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
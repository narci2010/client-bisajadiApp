// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueFire from 'vuefire'
import '../node_modules/material-design-lite/material.min.css'
import '../node_modules/material-design-lite/material.min.js'

/* eslint-disable */
var config = {
  apiKey: "AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8",
  authDomain: "vue-project-1a9b9.firebaseapp.com",
  databaseURL: "https://vue-project-1a9b9.firebaseio.com",
  projectId: "vue-project-1a9b9",
  storageBucket: "vue-project-1a9b9.appspot.com",
  messagingSenderId: "889735417412"
};
let firebaseApp = firebase.initializeApp(config)

Vue.prototype.$firebase = firebaseApp.database()

Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

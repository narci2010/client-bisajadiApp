// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueFire from 'vuefire'

/* eslint-disable */
var config = {
  apiKey: "AIzaSyDz64jtEntSQOSJVtB6ljjhBX3JUq_EddI",
  authDomain: "bisajadi-bce8b.firebaseapp.com",
  databaseURL: "https://bisajadi-bce8b.firebaseio.com",
  projectId: "bisajadi-bce8b",
  storageBucket: "",
  messagingSenderId: "465975858892"
};
let firebaseApp = firebase.initializeApp(config);

Vue.prototype.$firebase = firebaseApp.database()

Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

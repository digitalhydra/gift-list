
import Vue from 'vue'
import App from './App.vue'
import Vuefire from 'vuefire'
import Firebase from 'firebase'

Vue.use(Vuefire)

new Vue({
  el: '#app',
  render: h => h(App)
})
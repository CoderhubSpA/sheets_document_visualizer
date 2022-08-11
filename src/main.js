import Vue from 'vue'
import App from './App.vue'
import '@/sass/app.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

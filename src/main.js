// import { Vue } from 'vue'
import { createApp } from 'vue'
// import './style.css'
import router from './router'
import App from './App.vue'
import axios from 'axios'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'jquery/dist/jquery.min'
// import 'popper.js/dist/popper.min'
// import 'bootstrap/dist/js/bootstrap.min'

//import axios
//set credential axios with true
axios.defaults.withCredentials = true

// Vue.config.productionTip = false

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app');


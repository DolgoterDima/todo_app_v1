import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'materialize-css/dist/css/materialize.min.css'
//import 'material-design-icons/iconfont/material-icons.css';

 
import Sortable from 'vue-sortable'

 

const app = createApp(App)


 
import axios from 'axios'
import VueAxios from 'vue-axios'
 app.use(VueAxios, axios)

 
app.use(Sortable)
app.use(store)
app.use(router)
app.mount('#app')

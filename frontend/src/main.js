import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import axios from 'axios'
import('@/store/subscriber')

axios.defaults.baseURL = 'http://localhost:4000/api/'

store.dispatch('attempt', sessionStorage.getItem('token'))
    .then(() => {
        createApp(App)
            .use(router)
            .use(store)
            .mount('#app')
    })



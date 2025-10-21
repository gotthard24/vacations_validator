import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import naive from 'naive-ui'

createApp(App)
    .use(router)
    .use(store)
    .use(naive)
    .mount('#app')

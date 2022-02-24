import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/global.scss';
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Menubar from 'primevue/menubar';

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';

// import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

const app= createApp(App)
app.use(PrimeVue)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Menubar', Menubar)
app.component('InputText', InputText)
app.use(store).use(router).mount('#app')

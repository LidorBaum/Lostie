import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/global.scss';
import {createPinia } from "pinia"
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Menubar from 'primevue/menubar';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import SelectButton from 'primevue/selectbutton';
import ToggleButton from 'primevue/togglebutton';
import Toast from 'primevue/toast';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';

// import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons


// import {
//     create,
//     NButton,
//     NInput,

// } from 'naive-ui'

// const naive = create({
//     components: [NButton, NInput]
//   })

const app= createApp(App)
app.use(PrimeVue)
app.use(createPinia())
app.use(ToastService);
// app.use(naive)
app.directive('tooltip', Tooltip);
app.component('ProgressSpinner', ProgressSpinner)
app.component('Toast', Toast)
app.component('Button', Button)
app.component('Textarea', Textarea)
app.component('Dialog', Dialog)
app.component('RadioButton', RadioButton )
app.component('SelectButton', SelectButton )
app.component('ToggleButton', ToggleButton)
app.component('Menubar', Menubar)
app.component('Dropdown', Dropdown)
app.component('InputText', InputText)
app.use(router).mount('#app')

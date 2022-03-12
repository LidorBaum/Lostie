import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style/global.scss';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
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
import ScrollTop from 'primevue/scrolltop';
import ToastService from 'primevue/toastservice';
import Paginator from 'primevue/paginator';
import Password from 'primevue/password';
import VueGoogleMaps from '@fawmi/vue-google-maps';

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';

// import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

const app = createApp(App);
app.use(PrimeVue);
app.use(createPinia());
app.use(ToastService);
const GoogleAPIKey = process.env.GOOGLE || ''
console.log(GoogleAPIKey, 'google api key');
console.log(process.env);
app.use(VueGoogleMaps, {
    load: {
        key: GoogleAPIKey,
    },
});
//AIzaSyA0PnKw6ClT_i8_c4ePtiXRLg7MjyC4VCA
app.directive('tooltip', Tooltip);
app.component('Paginator', Paginator);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Toast', Toast);
app.component('Button', Button);
app.component('Textarea', Textarea);
app.component('Dialog', Dialog);
app.component('RadioButton', RadioButton);
app.component('Password', Password);
app.component('ScrollTop', ScrollTop);
app.component('SelectButton', SelectButton);
app.component('ToggleButton', ToggleButton);
app.component('Menubar', Menubar);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.use(router).mount('#app');

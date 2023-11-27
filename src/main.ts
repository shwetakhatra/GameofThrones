import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import axios  from "axios";
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App);

app.use(router);

const axiosInstance = axios.create({
    withCredentials: true,
});
app.config.globalProperties.$axios = { ...axiosInstance }

app.mount('#app');

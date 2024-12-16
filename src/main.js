import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/tailwind.css'; // Kết nối Tailwind CSS
import router from './router'; // Import router
import store from './store'; // Import Vuex store

const app = createApp(App);

// Kết nối các plugin vào Vue instance
app.use(router);
app.use(store); // Kết nối Vuex

app.mount('#app'); // Gắn app vào DOM

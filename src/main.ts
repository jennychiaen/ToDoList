import { createApp } from 'vue'
import App from './App.vue'
import "./style/index.css";
import router from './router';
import { createPinia } from 'pinia';





// import './style.css'
const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');

// createApp(App).use(router);
// createApp(App).mount('#app');
// createApp(App).use(router).mount('#app')


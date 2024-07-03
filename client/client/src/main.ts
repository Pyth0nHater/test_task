import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css'; 
import { Button } from 'ant-design-vue'; 
const app = createApp(App);

app.use(Button);

app.mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/UI/BaseButton'
import BaseDialog from './components/UI/BaseDialog'
import BaseToast from './components/UI/BaseToast'
import dockerPart from './views/home/DockerPart.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/index.scss'

const app = createApp(App);

app.component('base-button',BaseButton);
app.component('base-dialog',BaseDialog);
app.component('base-toast',BaseToast);
app.component('docker-part',dockerPart)

app.use(store).use(router).mount('#app')

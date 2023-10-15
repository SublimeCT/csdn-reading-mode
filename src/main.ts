import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { Application } from './Application';

console.log(123)
const main = async () => {
  await Application.init()
  createApp(App).mount(Application.el)
}

main()

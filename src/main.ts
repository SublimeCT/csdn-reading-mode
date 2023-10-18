import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { Application } from './Application';
import { Config } from './plugins/Config';
import { Style } from './plugins/Style';
import { CSDN } from './plugins/CSDN';
import { Intercept } from './plugins/Intercept';
import { Catalogue } from './plugins/Catalogue';

const main = async () => {
  // 注册 plugins
  Application
    .use(Config)
    .use(Style)
    .use(CSDN)
    .use(Intercept)
    .use(Catalogue)

  const application = new Application()

  // 触发 init 钩子
  application.emit('init')

  // 在页面加载完毕时触发 onLoad 钩子
  application.onLoad()

  // await Application.init()
  createApp(App).mount(Application.el)
}

main()

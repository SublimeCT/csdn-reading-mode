import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import { Application } from './Application';
import { Config } from './plugins/Config';
import { Style } from './plugins/Style';
import { CSDN } from './plugins/CSDN';
import { Intercept } from './plugins/Intercept';
import { Catalogue } from './plugins/Catalogue';
import { Pagination } from './plugins/Pagination';

const main = async () => {
  // 注册 plugins
  Application
    .use(new Config())
    .use(new Style())
    .use(new CSDN())
    .use(new Intercept())
    .use(new Catalogue())
    .use(new Pagination())

  const application = Application.application

  // 触发 init 钩子
  application.emit('init')

  // 在页面加载完毕时触发 onLoad 钩子
  application.onLoad()

  // await Application.init()
  createApp(App).mount(Application.el)
}

main()

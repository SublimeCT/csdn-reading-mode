import { CSDN } from "./CSDN"
import { Catalogue } from "./Catalogue"
import { Config } from "./Config"
import { Intercept } from "./Intercept"
import { Style } from "./Style"

export class Application {
  static el: HTMLDivElement = document.createElement('div')
  static init() {
    // 1. 加载脚本配置
    Config.init()
    // 2. 初始化样式
    Style.init()
    // 3. 解禁复制功能
    CSDN.allowCopy()
    // 4. 注入代码
    Intercept.init()
    // 5. 监听页面加载完毕事件
    Application.onLoad(() => {
      document.body.appendChild(Application.el)
      console.log('DOMContentLoaded')
      Catalogue.onLoad()
      Intercept.onLoad()
    })
  }
  static onLoad(fn: Function) {
    if (document.readyState) {
      fn()
    } else {
      window.addEventListener('DOMContentLoaded', () => fn())
    }
  }
}
import { CSDN } from "./CSDN"
import { Config } from "./Config"
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
  }
}
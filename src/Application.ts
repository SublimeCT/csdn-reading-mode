import { AppPlugin } from "./AppPlugin"
import { ScriptConfig } from "./ScriptConfig"

export class Application {
  static el: HTMLDivElement = document.createElement('div')
  static plugins: Array<AppPlugin> = []
  static application = new Application()
  static use(plugin: AppPlugin) {
    Application.plugins.push(plugin)
    return this
  }

  /** 触发 onLoad 钩子 */
  onLoad() {
    if (document.readyState) {
      this.emit('onLoad')
    } else {
      window.addEventListener('DOMContentLoaded', () => this.emit('onLoad'))
    }
  }

  /**
   * 触发钩子函数
   * @param hook 钩子事件函数名
   */
  emit(hook: keyof AppPlugin) {
    for (const plugin of Application.plugins) {
      if (typeof plugin[hook] === 'function') {
        (plugin[hook] as Function)()
      }
    }
  }

  /**
   * 配置项已修改
   * @param field 配置项字段
   */
  emitConfigChanged(field: keyof ScriptConfig) {
    for (const plugin of Application.plugins) {
      plugin.onConfigChange && plugin.onConfigChange(field)
    }
  }

  /**
   * 预览指定背景图
   * @param url 图片 URL
   */
  emitPreviewImage(url: string) {
    for (const plugin of Application.plugins) {
      plugin.onPreviewImage && plugin.onPreviewImage(url)
    }
  }
}

import type { SettledFileInfo } from "naive-ui/es/upload/src/interface"
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
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.emit('onLoad'))
    } else {
      this.emit('onLoad')
    }
  }

  /**
   * 触发钩子函数
   * @param hook 钩子事件函数名
   */
  emit(hook: keyof AppPlugin, ...args: Array<any>) {
    for (const plugin of Application.plugins) {
      if (typeof plugin[hook] === 'function') {
        (plugin[hook] as Function)(...args)
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
   * @param file 图片 file
   */
  emitPreviewImage(file: SettledFileInfo) {
    for (const plugin of Application.plugins) {
      plugin.onPreviewImage && plugin.onPreviewImage(file)
    }
  }

  emitChangeDynamicIamge(dynamic: boolean) {
    this.emit('onChangeDynamicBackground', dynamic)
    if (dynamic) {
      this.emit('onUpdateBackgroundImage')
    }
  }
}

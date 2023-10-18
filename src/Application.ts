export class Application {
  static el: HTMLDivElement = document.createElement('div')
  static plugins: Array<AppPlugin> = []
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
        (plugin[hook] as HookFunction)(this)
      }
    }
  }
}

/** 钩子函数类型 */
export type HookFunction = (app: Application) => void

/** 所有的 hooks */
export interface AppPlugin {
  init?: HookFunction
  onLoad?: HookFunction
}

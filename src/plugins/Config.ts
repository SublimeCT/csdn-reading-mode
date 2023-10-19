import { reactive, ref } from "vue"
import { AppStorage } from "../utils/AppStorage"
import { Toolkit } from "../utils/Toolkit"
import { ScriptConfig } from "../ScriptConfig"
import { AppPlugin } from "../AppPlugin"

export class Config extends ScriptConfig implements AppPlugin {
  /** 脚本名称 */
  static readonly NAME = 'CSDN 去广告沉浸阅读模式'
  /** 已选背景图片类目的 class name */
  static readonly STATE_SELECTED_CATEGORY = 'STATE_SELECTED_CATEGORY'
  /** 页面中的 sidebar 元素 selector */
  static readonly SIDEBAR_SELECTOR: string = '.csdn-side-toolbar'

  /** 页面中的 sidebar 元素是否可访问 */
  static visibleSidebar = ref(false)
  /** 是否显示设置弹窗 */
  static visibleSettingsDialog = ref(false)

  /** 脚本配置 */
  static config = reactive<Config>(new Config())
  /** 初始价脚本配置 */
  async init() {
    const settings = AppStorage.getValue('settings')
    const config = Config.config
    if (settings) {
      try {
        const _settings = JSON.parse(settings)
        if (!_settings || typeof _settings !== 'object') throw new Error('range data error')
        Object.assign(config, _settings)
      } catch (err) {
        console.error(err)
      }
    }
    const sidebar = await Toolkit.waitForElement(Config.SIDEBAR_SELECTOR)
    if (!sidebar) throw new Error('Missing Sidebar element')
    Config.visibleSidebar.value = true
  }

  onConfigChange(field: keyof ScriptConfig): void {
    AppStorage.setValue('settings', JSON.stringify(Config.config))
  }
}
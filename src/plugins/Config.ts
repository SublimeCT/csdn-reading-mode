import { AppStorage } from "../utils/AppStorage"
import { Toolkit } from "../utils/Toolkit"
import { SIDEBAR_SELECTOR, ScriptConfig } from "../ScriptConfig"
import { AppPlugin } from "../AppPlugin"
import { config, visibleSidebar } from "../State"
import { BackgroundImage } from "../utils/BackgroundImage"

export class Config implements AppPlugin {
  /** 初始化脚本配置 */
  async init() {
    const settings = AppStorage.getValue('settings')
    if (settings) {
      try {
        const _settings = JSON.parse(settings)
        if (!_settings || typeof _settings !== 'object') throw new Error('range data error')
        Object.assign(config, _settings)
      } catch (err) {
        console.error(err)
      }
    }
    // 页面中的 sidebar 元素
    const sidebar = await Toolkit.waitForElement(SIDEBAR_SELECTOR)
    if (!sidebar) throw new Error('Missing Sidebar element')
    visibleSidebar.value = true
  }

  onConfigChange(field: keyof ScriptConfig): void {
    AppStorage.setValue('settings', JSON.stringify(config))
  }
  onChangeDynamicBackground(dynamic: boolean) {
    if (dynamic) {
      config.fixedImageId = ''
    } else {
      config.fixedImageId = BackgroundImage.currentImage.id
    }
    this.onConfigChange('fixedImageId')
  }
  onRemoveCustomImage(ids: string[]): void {
    // 如果用户删除了固定显示的自定义图片, 则将固定图片 ID 置空
    if (config.fixedImageId && ids.includes(config.fixedImageId)) config.fixedImageId = ''
  }
}
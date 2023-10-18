import { reactive, ref } from "vue"
import { AppStorage } from "../utils/AppStorage"
import { Toolkit } from "../utils/Toolkit"

export class Config {
  /** 脚本名称 */
  static readonly NAME = 'CSDN 去广告沉浸阅读模式'
  /** 本地存储的 key */
  static readonly LOCAL_STORAGE_PREFIX = '$CSDNCleaner_'
  /** 已选背景图片类目的 class name */
  static readonly STATE_SELECTED_CATEGORY = 'STATE_SELECTED_CATEGORY'
  /** 页面中的 sidebar 元素 selector */
  static readonly SIDEBAR_SELECTOR: string = '.csdn-side-toolbar'
  /** 脚本配置 */
  static config = reactive<Config>(new Config())
  /** 初始价脚本配置 */
  static async init() {
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

  /** 页面中的 sidebar 元素是否可访问 */
  static visibleSidebar = ref(false)

  /** 类目集合 */
  categorys: Array<string> = []
  /** 图片集合 */
  imgs: Array<string> = []
  /** 自定义链接 */
  customUrl: string = ''
  /** 纯色背景 */
  bgColor: string = ''
  /** 默认是否隐藏设置按钮 */
  defaultHideMenu: boolean = false
  /** 默认是否隐藏底部推荐文章 */
  hideRecommendBox: boolean = false
  /** 默认是否隐藏底部版权信息 */
  hideCopyright: boolean = false
  /** 默认是否显示目录栏 */
  showCatalogue: boolean = false
  /** 是否匹配原文链接 */
  showSourceLink: boolean = true
  /** 文章宽度百分比 */
  articleWeightRate: string = ''

  /** 文章宽度百分比值 */
  get articleWeight() {
    const weight = Number(this.articleWeightRate)
    return (weight || 100) + '%'
  }
}
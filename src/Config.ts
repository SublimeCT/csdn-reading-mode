import { reactive } from "vue"
import { AppStorage } from "./AppStorage"

export class Config {
  /** 本地存储的 key */
  static readonly LOCAL_STORAGE_PREFIX = '$CSDNCleaner_'
  /** 已选背景图片类目的 class name */
  static readonly STATE_SELECTED_CATEGORY = 'STATE_SELECTED_CATEGORY'
  /** 脚本配置 */
  static config = reactive<Config>(new Config())
  /** 初始价脚本配置 */
  static init() {
    const range = AppStorage.getValue('settings')
    const config = Config.config
    if (range) {
      try {
        const _range = JSON.parse(range)
        if (!_range || typeof _range !== 'object') throw new Error('range data error')
        Object.assign(config, _range)
      } catch (err) {
        console.error(err)
      }
    }
  }

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
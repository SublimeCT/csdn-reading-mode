/** 脚本名称 */
export const NAME = 'CSDN 去广告沉浸阅读模式'

/** 页面中的 sidebar 元素 selector */
export const SIDEBAR_SELECTOR = '.csdn-side-toolbar'

/** 默认的百度皮肤背景图片类目 */
export const DEFAULT_CATEGORYS = ['小清新', '简约', '风景']

export class ScriptConfig {
  /** 类目集合 */
  categorys: Array<string> = []
  /** 图片集合 */
  imgs: Array<string> = []
  /**
   * 自定义链接
   * @deprecated 新脚本不再使用固定链接, 统一改为图片 ID
   */
  customUrl: string = ''
  /**
   * 固定使用的图片 ID
   * @description 如果存在则固定使用此图片
   */
  fixedImageId: string = ''
  /** 纯色背景, 优先级高于图片 */
  bgColor: string = ''
  /** 默认是否隐藏设置按钮 */
  defaultShowMenu: boolean = true
  /** 默认是否隐藏底部推荐文章 */
  hideRecommendBox: boolean = false
  /** 默认是否隐藏底部版权信息 */
  hideCopyright: boolean = false
  /** 默认是否显示目录栏 */
  showCatalogue: boolean = true
  /** 是否匹配原文链接 */
  showSourceLink: boolean = true
  /** 文章宽度百分比 */
  articleWeightRate: number = 100

  /** 文章宽度百分比值 */
  get articleWeight() {
    const weight = Number(this.articleWeightRate)
    return (weight || 100) + '%'
  }
}
/** 脚本名称 */
export const NAME = 'CSDN 去广告沉浸阅读模式'

/** 页面中的 sidebar 元素 selector */
export const SIDEBAR_SELECTOR = '.csdn-side-toolbar'

export class ScriptConfig {
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
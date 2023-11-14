import { AppPlugin } from "../AppPlugin";
import { Toolkit } from "../utils/Toolkit";

export class Pagination implements AppPlugin {
  /** 真实页数 */
  _pageCount: number = 0
  onLoad(): void {
    // 监听数据层变动并动态控制分页组件显示
    // @ts-ignore 这里必须使用 csdn, 如果使用 window.csdn 在生产环境会访问不到 window.csdn
    if (!csdn.comments) return
    // @ts-ignore
    Object.defineProperty(csdn.comments, 'pageCount', {
      get() { return this._pageCount || 1 },
      set(v) {
        console.log('set pageCount: ', v)
        this._pageCount = v // 先保存页数
        Toolkit.showDom('#commentPage', v > 1) // 1. 控制分页组件显示
        this._initPagintion() // 2. 重构评论区样式
      }
    })
  }
  _initPagintion() {
    // ...
  }
}
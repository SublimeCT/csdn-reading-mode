import { AppPlugin } from "../AppPlugin";
import { Toolkit } from "../utils/Toolkit";

export class Pagination implements AppPlugin {
  /** 真实页数 */
  _pageCount: number = 0
  init(): void {
    // 监听数据层变动并动态控制分页组件显示
    if (!window.csdn.comments) return
    Object.defineProperty(window.csdn.comments, 'pageCount', {
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
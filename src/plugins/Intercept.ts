import { AppPlugin } from "../AppPlugin"

/** 用于向页面内注入 JS 或修改变量值 */
export class Intercept implements AppPlugin {
  init() {
    this.interceptCSDN()
  }
  onLoad() {
    // 解除跳转拦截
    $ && $("#content_views") && $("#content_views").off('click')
  }
  /**
   * 拦截源码中对于 `window.csdn` 的赋值操作
   * @description 由于 `TamperMonkey` 中获取的 `window` 对象并不是真正的 `window` 对象, 所以不能直接 `Object.defineProperty(window, 'scdn')`
   * @description 所以用 `<script>` 注入的方式执行绑定拦截器的代码
   */
  interceptCSDN() {
    const script = document.createElement('script')
    script.innerText = `
    window.$csdn=window.csdn||{$intercept: true};
    $handleInterceptCSDN=0;
    Object.defineProperty(window, 'csdn',
      {
        set(val) {
          typeof window.$handleInterceptCSDN === 'function' ? window.$handleInterceptCSDN(val) : window.$csdn = val;
        },
        get() {
          return window.$csdn;
        }
      }
    );`
    document.querySelector('head')?.appendChild(script)
    window.$handleInterceptCSDN = (val: any) => {
      window.$csdn = val // 使用直接赋值的方式, 防止因某些属性无法遍历导致未赋值的情况
      window.$csdn.$intercept = true // 标记为已启用拦截
      window.$csdn.middleJump = null // 移除跳转链接时的事件绑定函数
    }
  }
}

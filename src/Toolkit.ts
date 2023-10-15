export class Toolkit {
  /**
   * 延迟指定时间
   * @param timeout 延迟时间
   */
  static delay(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  /**
   * 控制元素显隐(add / remove)
   * @param selector 元素选择器
   * @param isShow 是否显示
   */
  static showDom(selector: string, isShow: boolean) {
    const domList = document.querySelectorAll(selector)
    if (!domList || !domList.length) return
    const method = isShow ? 'remove' : 'add'
    for (const d of Array.from(domList)) {
      d.classList[method]('d-none')
    }
  }

  /**
   * 获取从 `0` 到指定整数值范围内的随机整数值
   * @param size 最大值
   */
  static getRandomInterger(size: number) {
    return Math.ceil(Math.random() * size) - 1
  }

  /**
   * 向页面中插入 `script` 标签
   * @param id script id
   * @param scriptCode 代码
   */
  static injectScriptElement(id: string, scriptCode: string) {
    const existsScript = document.getElementById(id)
    if (existsScript) existsScript.remove()
    const head = document.querySelector('head')
    if (!head) throw new Error('Missing Head element.')
    const script = document.createElement('script')
    script.id = id
    const code = document.createTextNode(scriptCode)
    script.appendChild(code)
    head.appendChild(script)
  }
}
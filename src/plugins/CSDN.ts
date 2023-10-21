import { Toolkit } from "../utils/Toolkit"
import { AppPlugin } from "../AppPlugin"

interface RewriteCode {
  target: string,
  key: string,
  value: string,
}

export class CSDN implements AppPlugin {
  private _getRewriteCode(code: RewriteCode | Array<RewriteCode>) {
    const _code = Array.isArray(code) ? code : [code]
    const definePropertyCode = _code.map(c => {
      return `
        Object.defineProperty(${c.target}, '${c.key}', {
          value: ${c.value},
          writable: false,
        });
      `
    })
    return `try {
      ${definePropertyCode.join('\n')}
    } catch (err) {}
    `
  }
  init() {
    this.allowCopy()
  }
  /** 解禁复制功能 */
  allowCopy() {
    try {
      Toolkit.injectScriptElement('clean-copy-script', `
        /** 解禁复制功能 */
        try { if (window.hljs) window.hljs.signin = window.hljs.copyCode } catch(err) {};
        try { if (window.mdcp) window.mdcp.signin = window.mdcp.copyCode } catch(err) {};
        /** 将 copyright 改为不可写, 防止添加复制事件 */
        if (window.csdn) {
          try {
            ${
              this._getRewriteCode([
                { target: 'window.csdn.copyright', key: 'init', value: 'function() { $("#content_views").unbind("copy"); }' },
                { target: 'window.csdn.copyright', key: 'textData', value: '""' },
              ])
            }
          } catch (err) {}
          $("#content_views").bind('click', function() {
              $("#content_views").unbind("copy");
          });
        }
      `)
    } catch (err) {
      console.log('cleanCopy() failed: ', err)
    }
  }
}
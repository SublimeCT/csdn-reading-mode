import { Config } from "./Config"
import { Toolkit } from "./Toolkit"

interface RewriteCode {
  target: string,
  key: string,
  value: string,
}

export class CSDN {
  private static _getRewriteCode(code: RewriteCode | Array<RewriteCode>) {
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
  /** 解禁复制功能 */
  static allowCopy() {
    try {
      Toolkit.injectScriptElement('clean-copy-script', `
        /** 解禁复制功能 - ${Config.NAME} */
        try { if (window.hljs) window.hljs.signin = window.hljs.copyCode } catch(err) {};
        try { if (window.mdcp) window.mdcp.signin = window.mdcp.copyCode } catch(err) {};
        /** 将 copyright 改为不可写, 防止添加复制事件 */
        if (window.csdn) {
          try {
            ${
              CSDN._getRewriteCode([
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
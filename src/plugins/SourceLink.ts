import { AppPlugin } from "../AppPlugin";
import { NAME, ScriptConfig } from "../ScriptConfig";
import { config } from "../State";

export class SourceLink implements AppPlugin {
  /** 原文链接匹配关键字 */
  static sourceLinkKeywords: Array<string> = ['转载自', '转自', '原文地址', '原文链接', '转载地址', '转载链接', '原文:', '原文：']

  /** 创建的原文链接元素 */
  sourceLinkLabelWrapperDom?: HTMLDivElement

  onLoad() {
    this.showSourceLink()
  }
  onConfigChange(field: keyof ScriptConfig): void {
    if (field == 'showSourceLink' && config.showSourceLink) this.showSourceLink()
  }
  showSourceLink(): void {
    if (this.sourceLinkLabelWrapperDom) return // 只执行一次生成并解析原文链接元素
    const sourceDom = document.querySelector('.article-source-link')
    let sourceLink = ''
    if (sourceDom) { // 从顶部折叠面板中获取
      let hasSourceLink = false
      for (const keyword of SourceLink.sourceLinkKeywords) {
        if (sourceDom.innerHTML.indexOf(keyword) !== -1) {
          hasSourceLink = true
          break
        }
      }
      if (hasSourceLink) {
        const linkDom = sourceDom.querySelector('a')
        if (linkDom) sourceLink = linkDom && linkDom.innerText
      }
    } else {
      const article = document.getElementById('article_content')
      // 从文中匹配, 从文末取 _sourceLinkCheckLineSize 行, 若包含 _sourceLinkKeywords 中的内容则使用正则匹配该行中包含的链接
      if (!article) return
      const articleRaw = article.innerHTML
      const articleLastLines = articleRaw.split('\n')
      // 倒序遍历, 优先取文末的原文链接
      for (const row of articleLastLines) {
        const link = this._getSourceLink(row)
        if (link) {
          sourceLink = link
          break
        }
      }
    }
    if (!sourceLink) return
    this.appendSourceLinkDom(sourceLink)
    console.log(`%c[${NAME}] 当前文章可能是转载的, 匹配到原文链接: ${sourceLink}`, 'color: teal')
  }

  _getSourceLink(row: string) {
    for (const keyword of SourceLink.sourceLinkKeywords) {
      if (row.indexOf(keyword) === -1) continue
      // 1. 尝试从 <a> 标签中获取链接
      const attrMatchRes = row.match(/href="(.*?)"/)
      const attr = attrMatchRes && attrMatchRes[1]
      if (attr) return attr
      // 2. 尝试获取整段链接内容
      const partMatchRes = row.replace(/<\/?[\w|\d]+>/g, '').match(/(https?:\/\/.*)\s?.*$/)
      const part = partMatchRes && partMatchRes[1]
      if (part) return part
    }
  }

  appendSourceLinkDom(link: string) {
    this.sourceLinkLabelWrapperDom = document.createElement('div')
    const sourceLinkIconDom = document.createElement('img')
    const sourceLinkLabelDom = document.createElement('span')
    const sourceLinkLinkDom = document.createElement('a')
    this.sourceLinkLabelWrapperDom.classList.add('source-link-wrapper')
    sourceLinkIconDom.classList.add('article-heard-img')
    sourceLinkIconDom.classList.add('source-link-icon')
    sourceLinkIconDom.setAttribute('src', 'https://csdnimg.cn/release/phoenix/template/new_img/shareWhite.png')
    sourceLinkLabelDom.classList.add('source-link-label')
    sourceLinkLabelDom.innerText = '转载自:'
    sourceLinkLinkDom.classList.add('follow-nickName')
    sourceLinkLinkDom.classList.add('source-link-link')
    sourceLinkLinkDom.innerText = link
    sourceLinkLinkDom.setAttribute('href', link)
    sourceLinkLinkDom.setAttribute('title', link)
    sourceLinkLinkDom.setAttribute('target', '_blank')

    this.sourceLinkLabelWrapperDom.appendChild(sourceLinkIconDom)
    this.sourceLinkLabelWrapperDom.appendChild(sourceLinkLabelDom)
    this.sourceLinkLabelWrapperDom.appendChild(sourceLinkLinkDom)
    // 插入页面中
    const wrapper = document.querySelector('.bar-content')
    // console.log(wrapper)
    if (wrapper) wrapper.appendChild(this.sourceLinkLabelWrapperDom)
  }
}

import { reactive } from "vue";
import { BackgroundImage } from "../utils/BackgroundImage";
import { AppPlugin } from "../AppPlugin";
import { ScriptConfig } from "../ScriptConfig";
import { config } from "../State";

export class StyleVars {
  '--comments-avatar-size': string = '50px'
  '--source-link-wrapper-display': string = 'none'
  '--background-color': string = '#EAEAEA'
  '--background-image': string = BackgroundImage.getImgUrl()
  '--article-weight': string = ''
  '--display-recommend-box': string = ''
  '--display-copyright': string = ''
  '--display-catalogue': string = ''
  static getVars(): StyleVars {
    const vars = new StyleVars()
    vars["--source-link-wrapper-display"] = config.showSourceLink ? 'inline-flex' : 'none'
    vars["--background-color"] = config.bgColor || '#EAEAEA'
    vars['--background-image'] = config.bgColor ? 'none' : BackgroundImage.getImgUrl()
    vars['--article-weight'] = config.articleWeight
    vars['--display-recommend-box'] = config.hideRecommendBox ? 'none' : 'block'
    vars['--display-copyright'] = config.hideCopyright ? 'none' : 'block'
    vars['--display-catalogue'] = config.showCatalogue ? 'block' : 'none'
    return vars
  }
}

export class Style implements AppPlugin {
  static vars: StyleVars = reactive(new StyleVars())
  static saveStylesAttrs() {
    if (!document.body) return console.warn('Missing <body>')
    for (const k in Style.vars) {
      if (k.indexOf('--') === 0) document.body.style.setProperty(k, Style.vars[k as keyof StyleVars])
    }
  }
  init() {
    // 1. 生成 css 变量并保存到 body 上
    Style.saveStylesAttrs()
    // 2. 移除黑色背景色的皮肤样式 css 文件
    this._removeSkinCss()
    // // 3. 先使文章内容透明, 等待脚本初始化完毕后再将其显示
    // console.log('先使文章内容透明, 等待脚本初始化完毕后再将其显示')
  }
  onLoad() {
    Style.saveStylesAttrs()
  }
  /** 移除黑色背景色的皮肤样式 css 文件 */
  private _removeSkinCss() {
    const linkElements = document.getElementsByTagName('link')
    if (linkElements && linkElements.length) {
      for (let linkIndex = linkElements.length; linkIndex--;) {
        const link = linkElements[linkIndex]
        if (link.href && link.href.indexOf('/themesSkin/') !== -1) {
          link.remove()
        }
      }
    }
    return this
  }
  onConfigChange(field: keyof ScriptConfig) {
    switch(field) {
      case 'bgColor':
        Style.vars['--background-color'] = config.bgColor
        break
    }
    Style.saveStylesAttrs()
  }
  /**
   * 预览指定背景图
   * @param url 图片 URL
   */
  onPreviewImage(url: string) {
    Style.vars['--background-image'] = `url(${url})`
    Style.saveStylesAttrs()
  }
  onUpdateBackgroundImage(): void {
    
  }
}

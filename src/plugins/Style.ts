import { BackgroundImage } from "../utils/BackgroundImage";
import { AppPlugin } from "../AppPlugin";
import { ScriptConfig } from "../ScriptConfig";
import { config } from "../State";
import type { SettledFileInfo } from "naive-ui/es/upload/src/interface";

export class StyleVars {
  '--comments-avatar-size': string = '50px'
  '--source-link-wrapper-display': string = 'none'
  '--background-color': string = '#EAEAEA'
  '--background-image': string = ''
  '--article-weight': string = ''
  '--display-recommend-box': string = ''
  '--display-copyright': string = ''
  '--display-catalogue': string = ''
  static getVars(): StyleVars {
    const vars = new StyleVars()
    vars["--source-link-wrapper-display"] = config.showSourceLink ? 'inline-flex' : 'none'
    vars["--background-color"] = config.bgColor || '#EAEAEA'
    vars['--background-image'] = 'none' // 先设置为 none; 再异步更新
    vars['--article-weight'] = config.articleWeight
    vars['--display-recommend-box'] = config.hideRecommendBox ? 'none' : 'block'
    vars['--display-copyright'] = config.hideCopyright ? 'none' : 'block'
    vars['--display-catalogue'] = config.showCatalogue ? 'block' : 'none'
    return vars
  }
}

export class Style implements AppPlugin {
  static vars: StyleVars = new StyleVars()
  static saveStylesAttrs() {
    if (!document.body) return console.warn('Missing <body>')
    for (const k in Style.vars) {
      if (k.indexOf('--') === 0) document.body.style.setProperty(k, Style.vars[k as keyof StyleVars])
    }
  }
  /** 更新背景图片 */
  static async updateBackgroundIamge() {
    if (config.bgColor) return
    const image = config.fixedImageId
      ? new BackgroundImage(config.fixedImageId)
      : await BackgroundImage.getImage()
    const backgroundImage = await image.getBackgroundImageValue()
    Style.vars['--background-image'] = backgroundImage
    Style.saveStylesAttrs()
  }
  init() {
    // 0. 更新 vars
    Style.vars = StyleVars.getVars()
    // 1. 生成 css 变量并保存到 body 上
    Style.saveStylesAttrs()
    // 2. 异步获取用户添加的自定义图片文件
    Style.updateBackgroundIamge()
    // 3. 移除黑色背景色的皮肤样式 css 文件
    this._removeSkinCss()
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
        if (config.bgColor) {
          Style.vars['--background-image'] = 'none'
        }
        break
    }
    Style.saveStylesAttrs()
  }
  /**
   * 预览指定背景图
   * @param file 图片 file
   */
  onPreviewImage(file: SettledFileInfo) {
    Style.vars['--background-image'] = `url(${file.url})`
    BackgroundImage.currentImage = new BackgroundImage(file.id)
    Style.saveStylesAttrs()
  }
  /** 刷新背景图片 */
  onUpdateBackgroundImage(): void {
    Style.updateBackgroundIamge()
  }
}

import { computed, reactive } from "vue";
import { Config } from "./Config";
import { BackgroundImage } from "./BackgroundImage";

export class StyleVars {
  '--comments-avatar-size': string = '50px'
  '--source-link-wrapper-display': string = 'none'
  '--background-color': string = '#EAEAEA'
  '--background-image': string = BackgroundImage.backgroundImage.getImgUrl()
  '--article-weight': string = ''
  '--display-recommend-box': string = ''
  '--display-copyright': string = ''
  '--display-catalogue': string = ''
  static getVars(): StyleVars {
    const vars = new StyleVars()
    vars["--source-link-wrapper-display"] = Config.config.showSourceLink ? 'inline-flex' : 'none'
    vars["--background-color"] = Config.config.bgColor || '#EAEAEA'
    vars['--background-image'] = Config.config.bgColor ? 'none' : BackgroundImage.backgroundImage.getImgUrl()
    vars['--article-weight'] = Config.config.articleWeight
    vars['--display-recommend-box'] = Config.config.hideRecommendBox ? 'none' : 'block'
    vars['--display-copyright'] = Config.config.hideCopyright ? 'none' : 'block'
    vars['--display-catalogue'] = Config.config.showCatalogue ? 'block' : 'none'
    return vars
  }
}

export class Style {
  private static _vars: StyleVars = new StyleVars()
  static vars = computed<StyleVars>({
    get() {
      return Style._vars
    },
    set(vars: StyleVars) {
      Object.assign(Style._vars, vars)
      Style.saveStylesAttrs()
    },
  })
  static saveStylesAttrs() {
    for (const k in Style.vars.value) {
      if (k.indexOf('--') === 0) document.body.style.setProperty(k, Style.vars.value[k as keyof StyleVars])
    }
  }
  static init() {
    // 1. 生成 css 变量并保存到 body 上
    Style.saveStylesAttrs()
    // 2. 移除黑色背景色的皮肤样式 css 文件
    Style._removeSkinCss()
  }
  /** 移除黑色背景色的皮肤样式 css 文件 */
  private static _removeSkinCss() {
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
}

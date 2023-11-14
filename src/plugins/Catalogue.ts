import { AppPlugin } from "../AppPlugin"
import { ScriptConfig } from "../ScriptConfig"
import { config } from "../State"
import { Style } from "./Style"

export class Catalogue implements AppPlugin {
  onLoad() {
    this.syncShowCatalogue()
  }

  syncShowCatalogue() {
    if (config.showCatalogue && document.getElementById('groupfile')) {
      window.fixedSidebarInButton()
      document.body.setAttribute('show-catalogue', '')
      if (window.$csdn && window.$csdn.fixedSidebar) {
        window.$csdn.fixedSidebar({
          targetBox: $(".blog_container_aside"),
          mainBox: $("main"),
          sidebar: $(".blog_container_aside"),
          direction: "left",
          position: "fixed",
          bottom: 0,
          zIndex: 99,
          sidebarRightMargin: 8,
          sidebarLeftMargin: 8
        })
      }
    } else {
      document.body.removeAttribute('show-catalogue')
    }
  }

  onConfigChange(field: keyof ScriptConfig): void {
    if (field !== 'showCatalogue') return
    this.syncShowCatalogue()
  }
}
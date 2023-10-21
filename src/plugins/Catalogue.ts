import { AppPlugin } from "../AppPlugin"
import { config } from "../State"
import { Style } from "./Style"

export class Catalogue implements AppPlugin {
  onLoad() {
    this.syncShowCatalogue()
  }

  syncShowCatalogue() {
    Style.saveStylesAttrs()
    if (config.showCatalogue && document.getElementById('groupfile')) {
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
}
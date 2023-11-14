import type { SettledFileInfo } from "naive-ui/es/upload/src/interface"
import { ScriptConfig } from "./ScriptConfig"

/** 所有的 hooks */
export interface AppPlugin {
  /** 脚本初始化 */
  init?(): void
  /** 页面加载完毕 */
  onLoad?(): void
  /** 配置项已修改 */
  onConfigChange?(field: keyof ScriptConfig): void
  /**
   * 预览指定背景图
   * @param file 图片 file
   */
  onPreviewImage?(url: SettledFileInfo): void
  /**
   * 用户删除已添加的自定义图片
   * @param ids 图片 ID
   */
  onRemoveCustomImage?(ids: Array<string>): void
  /** 刷新背景图片 */
  onUpdateBackgroundImage?(): void
  /** 用户修改是否使用随机背景选项 */
  onChangeDynamicBackground?(dynamic: boolean): void
}
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
   * @param url 图片 URL
   */
  onPreviewImage?(url: string): void
}
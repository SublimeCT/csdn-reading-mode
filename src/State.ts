import { reactive, ref } from "vue"
import { ScriptConfig } from "./ScriptConfig"

/** 页面中的 sidebar 元素是否可访问 */
export const visibleSidebar = ref(false)
/** 是否显示设置弹窗 */
export const visibleSettingsDialog = ref(false)

/** 脚本配置 */
export const config = reactive<ScriptConfig>(new ScriptConfig())

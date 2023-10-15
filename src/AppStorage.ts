import { Config } from './Config'
import { GM_getValue, GM_setValue } from '$'

export class AppStorage {
  /**
   * 通过 LocalStorage / GM_setValue 保存数据
   * @param key
   * @param value
   */
  static setValue(key: string, value: string) {
    localStorage.setItem(Config.LOCAL_STORAGE_PREFIX + key, value)
    GM_setValue(Config.LOCAL_STORAGE_PREFIX + key, value)
  }
  /**
   * 从 localStorage / GM_getValue 中取值
   * @param key
   * @param defaultValue
   */
  static getValue(key: string, defaultValue = null) {
    return localStorage.getItem(Config.LOCAL_STORAGE_PREFIX + key) || GM_getValue(Config.LOCAL_STORAGE_PREFIX + key, defaultValue)
  }
}
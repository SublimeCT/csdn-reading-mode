import { GM_getValue, GM_setValue } from '$'

export class AppStorage {
  /** 本地存储的 key */
  static readonly LOCAL_STORAGE_PREFIX = '$CSDNCleaner_'
  /**
   * 通过 LocalStorage / GM_setValue 保存数据
   * @param key
   * @param value
   */
  static setValue(key: string, value: string) {
    localStorage.setItem(AppStorage.LOCAL_STORAGE_PREFIX + key, value)
    GM_setValue(AppStorage.LOCAL_STORAGE_PREFIX + key, value)
  }
  /**
   * 从 localStorage / GM_getValue 中取值
   * @param key
   * @param defaultValue
   */
  static getValue(key: string, defaultValue = null) {
    return localStorage.getItem(AppStorage.LOCAL_STORAGE_PREFIX + key) || GM_getValue(AppStorage.LOCAL_STORAGE_PREFIX + key, defaultValue)
  }
}

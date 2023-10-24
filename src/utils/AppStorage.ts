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

/** 数据库表 */
export enum DBTable {
  /** 用户上传的背景图片 */
  BackgroundImages = 'BackgroundImages'
}

export class DB {
  /** 数据库名 */
  static DATABASE_NAME = 'CSDNReadingMode'
  /** 版本 */
  static VERSIONS = [1]

  /** 数据库对象 */
  private static _db?: IDBDatabase

  /** 获取数据库对象 */
  private static async _getBD() {
    if (DB._db) return DB._db
    const request = window.indexedDB.open(DB.DATABASE_NAME, DB.VERSIONS[DB.VERSIONS.length - 1])
    DB._db = await DB._getDBByRequest(request)
    return DB._db
  }
  private static _getDBByRequest(request: IDBOpenDBRequest): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = error => {
        console.error(error)
        reject(new Error('DB Error: Database open failed'))
      }
      request.onblocked = () => reject(new Error('DB Error: Database is blocked'))
      request.onupgradeneeded = event => {
        if (!request.result.objectStoreNames.contains(DBTable.BackgroundImages)) {
          const table = request.result.createObjectStore(DBTable.BackgroundImages, { keyPath: 'id' })
          table.transaction.oncomplete = () => resolve(request.result)
        } else {
          resolve(request.result)
        }
      }
    })
  }

  private static _getResultByRequest<T>(request: IDBRequest): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = error => {
        console.error(error)
        reject(new Error('DB Request Error: ' + error))
      }
    })
  }

  static async getList<T>(tableName: DBTable, range?: Parameters<IDBObjectStore['getAll']>[0], count?: Parameters<IDBObjectStore['getAll']>[1]) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readonly').objectStore(tableName)
    const request = table.getAll(range || null, count)
    const result = await DB._getResultByRequest<T>(request)
    return result
  }

  static async getAllKeys<T extends ReturnType<IDBObjectStore['getAllKeys']> = ReturnType<IDBObjectStore['getAllKeys']>>(tableName: DBTable, range?: Parameters<IDBObjectStore['getAllKeys']>[0], count?: Parameters<IDBObjectStore['getAllKeys']>[1]) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readonly').objectStore(tableName)
    const request = table.getAllKeys(range || null, count)
    const result = await DB._getResultByRequest<T>(request)
    return result
  }

  static async add<T>(tableName: DBTable, value: T) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readwrite').objectStore(tableName)
    const request = table.add(value)
    const result = await DB._getResultByRequest(request)
    return result
  }

  static async put<T>(tableName: DBTable, value: T) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readwrite').objectStore(tableName)
    const request = table.put(value)
    const result = await DB._getResultByRequest(request)
    return result
  }

  static async get(tableName: DBTable, id: Parameters<IDBObjectStore['get']>[0]) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readonly').objectStore(tableName)
    const request = table.get(id)
    const result = await DB._getResultByRequest(request)
    return result
  }

  static async delete(tableName: DBTable, id: Parameters<IDBObjectStore['delete']>[0]) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readwrite').objectStore(tableName)
    const request = table.delete(id)
    const result = await DB._getResultByRequest(request)
    return result
  }
}

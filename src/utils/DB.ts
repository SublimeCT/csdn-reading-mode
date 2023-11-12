/** 数据库表 */
export enum DBTable {
  /** 用户上传的背景图片 */
  BackgroundImages = 'BackgroundImages',
  /** 用户上传的背景图片文件 */
  BackgroundImageFiles = 'BackgroundImageFiles',
  /** 用户上传的背景图片缩略图文件 */
  BackgroundThumbImageFiles = 'BackgroundThumbImageFiles',
}

/**
 * indexeddb 数据处理类
 */
export class DB {
  /** 数据库名 */
  static DATABASE_NAME = 'CSDNReadingMode'
  /** 版本 */
  static VERSIONS = 1

  /** 数据库对象 */
  private static _db?: IDBDatabase

  /** 获取数据库对象 */
  private static async _getBD() {
    if (DB._db) return DB._db
    const request = indexedDB.open(DB.DATABASE_NAME, DB.VERSIONS)
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

      // 处理数据库升级事件
      request.addEventListener('upgradeneeded', async (event: IDBVersionChangeEvent) => {
        console.warn(`DB Upgrade: Upgrading ${event.oldVersion} to version ${event.newVersion}`)
        // 初始化表
        DB._initTable(request.result)
        // 处理版本升级
        switch (event.oldVersion) {
          case 0:
            break
        }
      })
    })
  }
  private static async _initTable(db: IDBDatabase) {
    // 创建背景图片信息表
    if (!db.objectStoreNames.contains(DBTable.BackgroundImages)) {
      db.createObjectStore(DBTable.BackgroundImages, { keyPath: 'id' })
      // await DB._handleTableRequest(table)
    }
    // 创建背景图片文件表
    if (!db.objectStoreNames.contains(DBTable.BackgroundImageFiles)) {
      db.createObjectStore(DBTable.BackgroundImageFiles, { keyPath: 'id' })
      // await DB._handleTableRequest(table)
    }
    // 创建缩略图文件表
    if (!db.objectStoreNames.contains(DBTable.BackgroundThumbImageFiles)) {
      db.createObjectStore(DBTable.BackgroundThumbImageFiles, { keyPath: 'id' })
      // await DB._handleTableRequest(table)
    }
  }
  private static _handleTableRequest(request: IDBObjectStore) {
    return new Promise((resolve, reject) => {
      request.transaction.oncomplete = () => resolve(void 0)
      // request.transaction.onabort = event => reject(event)
      request.transaction.onerror = event => reject(event)
    })
  }

  private static _getResultByRequest<T>(request: IDBRequest): Promise<T> {
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
    const result = await DB._getResultByRequest<Array<T>>(request)
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
    const result = await DB._getResultByRequest<IDBValidKey>(request)
    return result
  }

  static async put<T>(tableName: DBTable, value: T) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readwrite').objectStore(tableName)
    const request = table.put(value)
    const result = await DB._getResultByRequest<IDBValidKey>(request)
    return result
  }

  static async get<T>(tableName: DBTable, id: Parameters<IDBObjectStore['get']>[0]) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readonly').objectStore(tableName)
    const request = table.get(id)
    const result = await DB._getResultByRequest<T>(request)
    return result
  }

  static async delete(tableName: DBTable, id: Parameters<IDBObjectStore['delete']>[0]) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readwrite').objectStore(tableName)
    const request = table.delete(id)
    const result = await DB._getResultByRequest(request)
    return result
  }

  static async clear(tableName: DBTable) {
    const db = await DB._getBD()
    const table = db.transaction([tableName], 'readwrite').objectStore(tableName)
    const request = table.clear()
    const result = await DB._getResultByRequest(request)
    return result
  }
}
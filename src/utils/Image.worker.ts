/**
 * @file 这是一个用于处理图片的 web worker 文件
 * 
 * 参考:
 * - [vite Web Workers](https://cn.vitejs.dev/guide/features.html#web-workers)
 * - [Web Worker - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_AP)
 */

import { DB, DBTable } from "./DB"
import { WorkerMessageMethod } from "./WorkerTypes"

self.onmessage = async function (event: MessageEvent) {
  try {
    const key = event.data.key
    if (typeof key !== 'number') throw new Error('[web worker thread] Error: Invalid event key')
    switch(event.data.method) {
      case WorkerMessageMethod.saveImage:
        saveFile(event.data.data, DBTable.BackgroundImageFiles, event.data.key)
        break
      case WorkerMessageMethod.saveThumbImage:
        saveFile(event.data.data, DBTable.BackgroundThumbImageFiles, event.data.key)
        break
      case WorkerMessageMethod.getImageURL:
        getFile(event.data.data, DBTable.BackgroundImageFiles, event.data.key)
        break
      case WorkerMessageMethod.getThumbImageURL:
        getFile(event.data.data, DBTable.BackgroundThumbImageFiles, event.data.key)
        break
    }
  } catch (error: any) {
    error.key = (event as any).key || -1
    throw error
  }
}

async function saveFile(data: { id: string, file: File | Blob }, tableName: DBTable, key: number) {
  // console.log('saveFile: ', tableName, data)
  await DB.add(tableName, data)
  self.postMessage({ key })
}

async function getFile(data: { id: string }, tableName: DBTable, key: number) {
  // console.log('getFile: ', tableName, data)
  const image = await DB.get<{ id: string, file: File }>(tableName, data.id)
  self.postMessage({ key, url: URL.createObjectURL(image.file) })
}

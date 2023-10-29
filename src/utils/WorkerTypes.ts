export enum WorkerMessageMethod {
  /** 将图片保存到背景图片文件表 BackgroundImageFiles */
  saveImage = 'saveImage',
  /** 将图片保存到背景图片文件表 BackgroundThumbImageFiles */
  saveThumbImage = 'saveThumbImage',
  /** 获取原图 Blob URL */
  getImageURL = 'getImageURL',
  /** 获取缩略图 Blob URL */
  getThumbImageURL = 'getThumbImageURL',
}

export interface WorkerMessageData {
  key?: number,
  id: string,
  file: File | Blob
}

export interface WorkerMessage {
  method: WorkerMessageMethod
  data: WorkerMessageData
}

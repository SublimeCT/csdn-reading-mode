import ImageWorker from './Image.worker?worker&inline'

/**
 * 封装和管理用于处理图片的 `Web Worker` 进程
 */
export class ImageWorkerHandler {
  /** 最大线程数 */
  static readonly WORKER_MAX_COUNT = Math.max(navigator.hardwareConcurrency, 4)
  /** 创建用于处理图像的线程, 为了防止超过浏览器限制, 最大数量为 4 */
  static workers: Array<Worker> = []
  // static workers = Array.from({ length:  }).map(() => new ImageWorker())
  /** 当前使用的线程 key */
  static poolTaskCount: Array<number> = []
  /**
   * 从线程池中创建或获取线程
   * @description 这是一个简单的 **依次平均分配** 任务的线程获取函数
   */
  static getWorker() {
    if (ImageWorkerHandler.workers.length >= ImageWorkerHandler.WORKER_MAX_COUNT) { // 使用已有线程
      let targetIndex = 0
      for (let index = 0; index < ImageWorkerHandler.poolTaskCount.length; index++) {
        if (index === 0) continue
        if (ImageWorkerHandler.poolTaskCount[index] < ImageWorkerHandler.poolTaskCount[index - 1]) {
          targetIndex = index
          break
        }
      }
      ImageWorkerHandler.poolTaskCount[targetIndex]++
      console.log('getWorker: ', targetIndex, ImageWorkerHandler.poolTaskCount)
      return ImageWorkerHandler.workers[targetIndex]
    } else { // 创建新线程
      const worker = new ImageWorker()
      // 添加事件监听函数
      ImageWorkerHandler._listen(worker)
      // const worker = new Worker(ImageWorkerURL)
      ImageWorkerHandler.workers.push(worker)
      ImageWorkerHandler.poolTaskCount[ImageWorkerHandler.workers.length - 1] = 1
      return worker
    }
  }
  private static _listen(worker: Worker) {
    worker.addEventListener('error', (event) => ImageWorkerHandler._handleWorkerMessageEvent('error', event))
    worker.addEventListener('message', (event) => ImageWorkerHandler._handleWorkerMessageEvent('message', event))
    worker.addEventListener('messageerror', (event) => ImageWorkerHandler._handleWorkerMessageEvent('messageerror', event))
  }
  /**
   * 处理事件并触发已添加的事件函数
   * @param name 事件名称
   * @param event 事件返回值
   */
  private static async _handleWorkerMessageEvent(name: 'error' | 'message' | 'messageerror', event: MessageEvent | ErrorEvent) {
    const key = ImageWorkerHandler._getEventKey(name, event)
    if (typeof key === 'number') {
      if (ImageWorkerHandler._poolTaskEventMap[key]) {
        if (name === 'error') {
          await ImageWorkerHandler._poolTaskEventMap[key]!.onError(event as any)
        } else if (name === 'message') {
          await ImageWorkerHandler._poolTaskEventMap[key]!.onMessage(event as any)
        } else if (name === 'messageerror') {
          await ImageWorkerHandler._poolTaskEventMap[key]!.onError(event as any)
        }
        if (ImageWorkerHandler._poolTaskEventMap[key]!.once) {
          ImageWorkerHandler._poolTaskEventMap[key] = null
        }
      } else {
        console.warn('Missing Event listener - ' + name)
      }
    } else {
      if (name === 'message') {
        console.warn('message', event)
      } else {
        console.error(name, event)
      }
      throw new Error('Worker Internal Error: Unknow Message Key')
    }
  }
  private static _getEventKey(name: 'error' | 'message' | 'messageerror', event: MessageEvent | ErrorEvent) {
    if (name === 'error') {
      return (event as any).key
    } else {
      return (event as MessageEvent).data.key
    }
  }
  /**
   * 所有的 worker 的自增唯一 key
   * @description 每次向 worker 发送消息时会向其发送这个 key, 作为本次请求的唯一标识, 同时也作为事件监听函数 {@link _poolTaskEventMap} 的 key
   */
  private static _workerRequestIncromentKey: number = 0
  /** 事件监听函数数组 */
  private static _poolTaskEventMap: Array<null | { once: boolean, onMessage: (event: MessageEvent) => void, onError: (error: Error) => void }> = []
  /**
   * 向 web worker 进程发送一次消息
   * @param data 消息数据
   */
  static async request<T = any>(data: { method: string, key?: number, data: T }): Promise<any> {
    const worker = await ImageWorkerHandler.getWorker()
    if (!data.key) data.key = ImageWorkerHandler._workerRequestIncromentKey++
    // console.log('[web worker] message: ', data)
    worker.postMessage(data)
    return new Promise((resolve, reject) => {
      ImageWorkerHandler._poolTaskEventMap.push({
        once: true,
        onMessage(event: MessageEvent) {
          resolve(event)
        },
        onError(error) {
          reject(error)
        }
      })
    })
  }
}
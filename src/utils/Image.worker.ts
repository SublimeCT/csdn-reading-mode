/**
 * @file 这是一个用于处理图片的 web worker 文件
 * 
 * 参考:
 * - [vite Web Workers](https://cn.vitejs.dev/guide/features.html#web-workers)
 * - [Web Worker - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_AP)
 */

self.onmessage = async function (event: MessageEvent) {
  switch(event.data.method) {
    case 'fileToBase64':
      // const base64URL = await fileToBase64()
      break
  }
}

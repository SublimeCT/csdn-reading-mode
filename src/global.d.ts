interface Window {
  /** 原始的 $csdn */
  $csdn: any
  /** 代理的 csdn */
  csdn: any
  /** 用于处理 csdn 的 setter 函数 */
  $handleInterceptCSDN?: number | Function
}
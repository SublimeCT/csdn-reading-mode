interface Window {
  /** 原始的 $csdn */
  $csdn: any
  /** 代理的 csdn */
  csdn: any
  /** 用于处理 csdn 的 setter 函数 */
  $handleInterceptCSDN?: number | Function
  /** csdn 页面源码中用于固定右下角 sidebar 位置的方法 */
  fixedSidebarInButton(): void
}
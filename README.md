# CSDN 沉浸阅读模式
> 本项目基于 ❤️ [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 构建

## 💪 功能
> 点击右下角小齿轮打开脚本设置弹窗

- 屏蔽所有广告
- **以最快方式加载脚本**, 不会等待页面加载完成后再执行脚本
- **移除与正文无关的一切元素**
- 正文部分宽度放大, 可自定义正文宽度
- 绕过阅读更多按钮, **直接展开正文内容**
- 从文中提取原文链接(如果作者写了会在顶部 `info-box` 里 **显示转载自**) 可设置是否显示
- 增强广告屏蔽，建议使用 ABP 等插件屏蔽广告，还可以明显提升页面加载速度
- **屏蔽登录弹窗**
- 增加 **随机背景图** 并设置透明度
- **解除跳转拦截**, 直接跳转到目标链接
- 默认显示评论列表分页组件
- 可以解除固定在屏幕底部的 `toolbox`
- **可设置纯色背景**
- 显示文章目录
- 文中代码块 **解除禁用复制**

## ❤️ 贡献
> 本项目是对于 [旧的脚本](./src/csdn_rewrite.js) 的重构版本, 相比于旧脚本, 新项目基于 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 实现了:
> - 开发环境的热更新
> - `TypeScript` 及 `Vue` 的支持
> - 清晰的目录结构
> - 项目工程化
> - 基于 [Application](#应用) 和 [Plugin](#插件) 增强了代码的可维护性和扩展能力

```bash
# 安装依赖
pnpm install

# 开发
pnpm run dev # 或 npm run dev

# 打包
pnpm run build
```

### 目录结构
```bash
src/
├── App.vue                           ------- 入口组件
├── Application.ts                    ------- 应用类, 详见 📚 应用 章节
├── assets
│   ├── vite.svg
│   └── vue.svg
├── components                        ------- 所有的组件
│   ├── SettingsButton.vue            ------- 📚 页面右下角的设置按钮组件
│   └── SettingsDialog.vue            ------- 📚 设置弹窗组件
├── csdn_rewrite.js                   ------- 重构前原始单文件的旧脚本
├── global.d.ts                       ------- 声明挂载到 window 上的全局变量
├── main.ts                           ------- 脚本的入口文件
├── plugins                           ------- 插件目录, 详见 📚 插件 章节
│   ├── CSDN.ts                       ------- 🔌 用于劫持或修改 `window.csdn` 变量
│   ├── Catalogue.ts                  ------- 🔌 用于美化目录元素
│   ├── Config.ts                     ------- 🔌 用于处理脚本设置中的数据
│   ├── Intercept.ts                  ------- 🔌 用于向页面内注入 `<script>` 形式的 `js` 代码
│   └── Style.ts                      ------- 🔌 用于处理所有的 `css` 样式
├── style.scss                        ------- 样式文件, 会注入到页面中, 用于修改原有样式
├── utils                             ------- 独立于插件的功能模块
│   ├── AppStorage.ts                 ------- 用于处理需要保存到浏览器中的数据
│   ├── BackgroundImage.ts            ------- 用于处理页面背景
│   └── Toolkit.ts                    ------- 其他全局方法
└── vite-env.d.ts
```

项目对于各个功能模块做了很细致的划分, 对于开发者来说:

- 如果要 **修改页面样式**:
  - 应该只修改 [src/style.scss](./src/style.scss) 文件
  - 如果涉及 `css` 变量, 应该修改 [StyleVars - src/plugins/Styles.ts](./src/plugins/Style.ts)
- 如果要修改插入到页面中的 **组件**(例如 *设置按钮* / *设置弹窗*):
  - 应该修改 [src/components/](src/components/) 下的组件
- 如果需要 **使用 `javascript`** 实现一些功能:
  - 首先查看 [src/plugins](./src/plugins/) 目录下是否有相关的 `plugin`, 如果有就应该写到对应的 `plugin` 类中
  - 如果没有相关 `plugin`, 应该创建新的 `plugin` 文件

### 应用
> 源码位于 `src/Application.ts`

应用是 [Application](./src/Application.ts) 类的实例, 用于组织和管理所有的 [Plugin](#插件)

[src/main.ts](./src/main.ts):

```typescript
// 注册 plugins
Application
  .use(Config)
  .use(Style)
  .use(CSDN)
  .use(Intercept)
  .use(Catalogue)
```

对于每个 `plugin`, 都应该先调用 `Application.use()` 进行注册, *很像 `Vue` 注册组件的方式*

### 插件
插件是一个独立的功能模块, 专注于实现某个功能

### Hooks
`Hooks` 是在 `Application` 上实现的一层抽象, *用于实现类似于 `Vue` 的生命周期的功能*

## CHANGELOGS

[CHANGELOGS.md](./CHANGELOGS.md)

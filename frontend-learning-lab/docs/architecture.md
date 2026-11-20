# 工程结构与启动原理

## 技术栈

| 依赖或运行环境 | 版本 | 当前用途 |
| --- | --- | --- |
| Node.js / npm | 24.22.3 / 11.19.1 | 在本地运行构建工具并安装依赖。阶段 0 首次验证使用便携版 Node.js 24.22.0，系统升级后用 24.22.3 复验 |
| Vue / `@vue/compiler-sfc` | 3.5.45 / 3.5.45 | 运行响应式界面与编译 `.vue` 文件。源码采用 JavaScript 和 `<script setup>` |
| Vue Router / Vuex | 4.5.1 / 4.1.0 | 根据地址渲染首页，提供练习计数状态 |
| Webpack / webpack-cli / webpack-dev-server | 5.106.0 / 5.1.4 / 5.2.7 | 打包、执行命令、提供本地开发服务 |
| vue-loader | 17.4.0 | 将单文件组件的三类代码交给对应处理流程 |
| css-loader / style-loader | 7.1.2 / 4.0.0 | 处理 CSS 引用，把样式注入浏览器。Webpack 从右到左执行这条 loader 链 |
| html-webpack-plugin | 5.6.4 | 处理 HTML 模板，注入入口脚本和环境对应的网页标题 |

Router、Vuex、Webpack、webpack-cli 和 Vue Loader 跟 `demoOne` 对应版本一致。根据 npm 审计建议，Vue 和 SFC 编译器从参考的 3.5.38 同步更新至 3.5.45，webpack-dev-server 从 5.2.3 更新至 5.2.7。项目直接通过 Webpack CLI 读取 `vue.config.js`，构建流程和公司脚本便于逐行对照。Vuex 和 JavaScript 对应实际要读的 `store` 与页面源码。这个阶段用 `--mode` 完成构建模式选择，用 Node 24 的 `parseEnv` 解析环境文件，用 Webpack 的 `asset/resource` 处理图片。Axios、core-js、Babel、Jest 和 CSS 预处理留到产生具体需求时评估。

## 文件职责

| 文件 | 当前职责 |
| --- | --- |
| `package.json`、`package-lock.json` | 声明项目、运行时和脚本，锁定本次实际安装的整个依赖树 |
| `vue.config.js` | 配置入口、开发服务、输出、Vue/CSS/图片规则以及 HTML 模板插件 |
| `.env.development`、`.env.production` | 为相应构建模式提供浏览器标签页标题 |
| `public/index.html` | Webpack 用来生成 `index.html` 的模板，包含挂载容器 `#app` |
| `src/main.js` | Webpack 的入口模块，动态加载并调用 `bootstrap()`，在 Console 报告启动失败 |
| `src/bootstrap.js` | 创建应用，注册路由和状态插件，等待初始路由，挂载到页面 |
| `src/App.vue` | 渲染根组件的路由出口 `RouterView`，声明页面的全局基础样式 |
| `src/router/index.js` | 维护 URL 和页面组件的映射。`/` 匹配 `lab-home`，加载 `CustomPage.vue` |
| `src/store/index.js` | 创建 Vuex Store，保存练习计数并通过 mutation 修改 |
| `src/views/demo/CustomPage.vue` | 首页的结构、按钮处理逻辑和局部样式 |
| `src/assets/favicon.png` | 浏览器栏图标。HTML 模板引用它，Webpack 输出带哈希的图片地址 |
| `.gitignore`、`README.md`、`docs/` | 排除本机工具和产物，提供运行入口、学习资料和验收记录 |

`global.js` 在有全局注册需求时再创建。`src/config/` 将在 HTTP 阶段承载接口前缀和需共享的业务配置。`store/modules/` 在状态可按业务划分时使用。`node_modules/`、`dist/` 和 `.tools/` 分别存放安装依赖、生产产物和本机便携工具。

## 从浏览器到页面

```text
浏览器请求 /
  → Webpack 开发服务返回生成的 index.html，HTML 加载入口脚本
  → src/main.js 动态 import('./bootstrap.js')
  → 浏览器请求 bootstrap 分块，加载成功后调用 bootstrap()
  → createApp(App) 创建 Vue 应用实例，指定 App.vue 为根组件
  → app.use(router) 安装路由并启动初次导航
  → app.use(store) 安装 Vuex，使组件内 useStore() 可取得同一 Store
  → await router.isReady() 等待 URL 对应的首次导航完成
  → app.mount('#app') 在 div#app 内渲染 App.vue
  → <RouterView /> 根据路由匹配结果渲染 CustomPage.vue
```

1. `main.js` 的入口身份来自 `vue.config.js` 里的 `entry`。`HtmlWebpackPlugin` 把入口构建产物的地址写进生成的 HTML。浏览器执行的是构建后的 JavaScript。
2. `import()` 返回 Promise。Webpack 把这部分依赖编译成单独的 chunk，运行到这行时请求该分块。`webpackChunkName` 提供名字前缀 `bootstrap`，构建产物同时带内容哈希。`main.js` 管加载和启动错误，`bootstrap.js` 管应用如何初始化。
3. `createApp(App)` 创建一个可安装插件的应用实例。`use` 在这个应用上安装插件。`mount('#app')` 找到 HTML 中的 `id="app"`，把根组件渲染到容器内。
4. `createWebHistory()` 让路由读取浏览器路径，路由表的 `path` 决定匹配结果，`component` 指向页面，`name` 是代码中可引用的路由名。`RouterView` 是组件渲染的位置。开发服务的 `historyApiFallback` 让前端路径能先取得 HTML 入口，再交给 Vue Router 匹配。
5. 点击按钮时，`@click` 调用同名函数。`store.commit(...)` 触发对应 mutation，更新 `state.practiceCount`。首页的 `computed` 读取该字段，Vue 跟踪依赖并更新计数。刷新会重建 Store，计数归零。

用 Spring Boot 类比，`entry` 指向的 `main.js` 类似应用的启动入口，`bootstrap.js` 类似集中组装启动依赖的位置，`app.use(...)` 像为应用接入所需模块。这里的应用实例、路由匹配、DOM 渲染都发生在浏览器。Spring MVC 的 `@RequestMapping` 在 JVM 中匹配 HTTP 请求并生成响应，前端 Router 在 HTML/JS 已加载后决定显示哪个组件。Vuex Store 保存浏览器内存中的 UI 状态，刷新时会重建。

## 环境与接口配置

`npm run serve` 传入 `--mode development`，提供热更新和源码定位。`npm run build` 传入 `--mode production`，启用生产优化并把产物写入 `dist/`。两条命令都从同一份 `vue.config.js` 读取配置。

配置函数用 `argv.mode` 选取 `.env.<mode>`，在构建时用 `node:fs` 读取文件、用 `node:util` 的 `parseEnv` 解析 `APP_TITLE`，再通过 `HtmlWebpackPlugin` 写入 `<title>`。开发标签显示「前端学习实验室（开发）」，生产标签显示「前端学习实验室」。这可以类比 Spring 的环境配置选择，前端示例的值在构建时确定，用户可以从生成的网页看到它。

阶段 9 将用相同思路集中配置 API 前缀和开发代理。组件负责传业务参数，请求层负责选择 API 地址。这样切换本地 Spring Boot 与部署环境时，可以集中修改配置。写入前端构建变量的值在浏览器中可见，服务端密钥留在服务端。

启动、停止和打包命令见 [README](../README.md)。更多机制可查 [Vue 应用 API](https://vuejs.org/api/application.html)、[Vue Router 历史模式](https://router.vuejs.org/guide/essentials/history-mode.html)、[Webpack 开发服务](https://webpack.js.org/configuration/dev-server/) 和 [Vue Loader](https://vue-loader.vuejs.org/guide/)。

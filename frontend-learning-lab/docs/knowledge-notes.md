# 知识笔记

## 阶段 0 · 工程初始化

| 技术 | 在本项目做什么 | Java 后端类比 | 常见错误及观察方法 |
| --- | --- | --- | --- |
| Node.js | 在本地执行 Webpack 等 JavaScript 工具。用 `node --version` 核对终端所用版本 | 构建工具需要可用的运行时，类似用合适的 JDK 跑 Maven | 系统 `node` 版本过旧。用 `Get-Command node` 检查命令来源 |
| npm / Yarn | 都能安装 JavaScript 依赖和执行项目脚本。本工程使用 npm，`npm ci` 根据锁文件还原依赖 | `package.json` 的依赖声明和脚本用途类似 `pom.xml` 的依赖与构建配置 | 混用包管理器会产生不同的锁文件和安装结果 |
| `node_modules` | 保存 npm 解包的依赖和传递依赖，`npm run` 会查找其中的可执行工具 | 类似 Maven 下载的依赖集合，npm 的这份目录属于当前项目 | 直接改目录内文件会在重新安装后丢失。检查 `npm ls --depth=0` 确认实际安装版本 |
| Webpack / Vue Loader | `entry` 指定入口，Webpack 分析依赖并输出可执行资源。`vue-loader` 配合 `@vue/compiler-sfc` 处理 `.vue` | 可类比编译和打包过程。产物是浏览器资源 | 漏配 loader 或插件，先看构建日志第一条 `ERROR in` |
| Vue 单文件组件 | `template` 声明结构，`<script setup>` 放变量和事件函数，`<style scoped>` 限制样式范围 | 可类比同一 UI 模块中定义视图行为与外观 | 模板引用拼写错误时看 Console，局部样式是否匹配用 Elements 检查 |
| `import()` | `src/main.js` 等异步分块加载后调用 `bootstrap()`。用 Network 可看见 `bootstrap.*.js` | 类似把加载阶段和应用初始化阶段拆开 | 生产环境旧 HTML 引用不存在的哈希文件时，看资源请求状态 |
| `createApp`、`use`、`mount` | `src/bootstrap.js` 组装 Vue 应用，挂载到 HTML 中的 `#app` | 集中组装启动依赖类似 Spring Boot 启动阶段。Vue 挂载对应浏览器 DOM 渲染 | 路由或 Store 漏装时检查 `app.use(...)`，白屏时检查 Console 和 `#app` |
| Vue Router | `src/router/index.js` 显式声明 `/` 对应页面，`RouterView` 渲染匹配到的组件 | 类似用路径找处理对象。Spring MVC 处理服务端请求，Router 切换客户端视图 | 地址能返回 HTML 但没页面时查路由表。直接刷新出现 HTTP 404 时查服务器回退 |
| Vuex | `useStore()` 读取已安装的 Store，`commit` 执行 mutation 更新计数。当前计数用于验证状态链路 | 类似将一份共享状态的读写集中到明确位置。数据在浏览器内存中 | 改了状态但界面没变化时，检查模板读取是否保持响应式关联，检查 commit 的名字 |
| 环境配置 | `--mode` 选取 `.env.*`，Webpack 配置在构建时读取 `APP_TITLE` | 类似选取 Spring 环境配置，前端产物在构建时写入当前值 | 编辑 `.env.*` 后重启开发服务或重新构建，观察浏览器标签标题 |

## 在 F12 复看一次启动

1. 打开 [开发首页](http://127.0.0.1:8080/) 和 F12 的 Network，刷新，观察文档、入口脚本和 `bootstrap.*.js` 的请求顺序。
2. 在 Elements 展开 `div#app`，找到其中的 `<main>` 和 `<h1>`，把这层 DOM 对应到 `App.vue` 中的路由出口和 `CustomPage.vue` 的模板。
3. 在 Sources 通过 `Ctrl+P` 搜索 `CustomPage.vue`，对 `store.commit(...)` 设置断点。点计数按钮，继续执行后观察页面变化。刷新时 Store 随应用重建。

## Git 基础

本次启动前 `git --version` 返回 2.55.0.windows.5，工作区尚无 Git 仓库。在已有仓库中，`git status --short` 查看改动状态，`git diff` 查看并核对未暂存修改，`git diff --staged` 查看已暂存的差异。`.gitignore` 排除本机便携工具、依赖目录和构建产物。`package-lock.json` 属于工程源码交付的一部分。

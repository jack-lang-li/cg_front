# 排障手册

这里只记录实际遇到的问题。需要查看启动链时，按 [工程结构与启动原理](architecture.md) 中的顺序定位。

## 默认 Node 和 npm 版本过旧

- 现象与信息。启动前在 PowerShell 运行 `node --version` 和 `npm.cmd --version`，分别返回 `v9.4.0` 和 `5.6.0`。执行旧 npm 时还出现 `npm update check failed`。Yarn 命令未找到。
- 原因与排查。`Get-Command` 显示命令来自 `C:\Program Files\nodejs`。Webpack 开发服务 5 要求 Node 至少为 18.12.0，当前工程使用的内置环境文件解析来自 Node 24。对照了公开 npm 元数据里的 `engines` 和 `peerDependencies`。详情可查 [Webpack 开发服务文档](https://webpack.js.org/configuration/dev-server/)。
- 处理与验证。从 Node.js 官方发布渠道取得 Windows x64 便携包，核对 SHA-256 后解压至项目 `.tools`。终端临时把此目录加到 PATH 后，确认 `v24.22.0` 和 `11.19.1`，并完成依赖安装。命令见 [README](../README.md)。

## 默认工具终端无法访问公开下载站点

- 现象与信息。受限终端请求 `registry.npmjs.org` 和 `nodejs.org` 时报告 `curl: (7) Failed to connect to 127.0.0.1 port 9`。
- 原因与排查。受限终端设置了出站代理。相同公开站点在批准联网的命令中可以访问。
- 处理与验证。使用批准联网的命令下载 Node 和安装公开依赖。包缓存位于 `.tools/npm-cache`。随后使用锁文件和该缓存运行 `npm ci --offline` 成功，验证了可重复安装。

## 初次参考版本的依赖审计告警

- 现象与信息。首次 `npm install` 完成，并报告 2 项高危和 3 项中危。`npm audit --json` 展示了 Vue 运行时关联的 `@vue/server-renderer`，以及 webpack-dev-server 本身和 `sockjs`、`uuid` 依赖链。
- 处理与验证。将 Vue 和 SFC 编译器同步更新至 3.5.45，开发服务更新至 5.2.7，再次安装并审计。高危降为 0，仍有 3 项中危记录，均来自 `webpack-dev-server → sockjs → uuid` 的同一条开发依赖链。npm 给出的升级方案涉及开发服务 6，本阶段保留参考工程的 5 系列。开发服务绑定 `127.0.0.1`，使用默认 WebSocket 实现。锁定版本和用途见 [工程说明](architecture.md)。[npm 报告关联的 uuid 公告](https://github.com/advisories/GHSA-w5hq-g745-h8pq)

## 临时生产预览的带参数网址返回 404

- 现象与信息。用 Edge 打开生产预览的 `/?verify=stage0` 时，首次收到 HTTP 404 和 `net::ERR_HTTP_RESPONSE_CODE_FAILURE`。
- 原因与排查。临时静态服务用完整请求地址查找文件，查找键连同查询字符串一起传入。预期的静态文件查找键是路径 `/`。
- 处理与验证。测试服务改用 `URL.pathname` 查找静态资源。重跑后 Edge 收到 HTTP 200，Vue Router 同时取得路径 `/` 与查询参数 `verify=stage0`。这次调整发生在本地验证脚本中。

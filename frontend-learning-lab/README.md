# 前端学习实验室

用同一个 Vue 3 + Webpack 5 工程练习设备缺陷管理系统。按小任务逐步实现页面结构、表单、表格、接口调用和 CRUD。当前任务可在学习进度中查看。

## Windows 上启动

在 PowerShell 中执行以下命令。本机系统安装的 Node.js 24.22.3 和 npm 11.19.1 已通过启动和构建检查。

```powershell
Set-Location 'D:\NFDW\cg_front\frontend-learning-lab'
node --version
npm.cmd --version
npm.cmd run serve
```

打开 [开发首页](http://127.0.0.1:8080/)。页面应显示「前端学习实验室」，浏览器标签应显示「前端学习实验室（开发）」。点击「增加练习计数」，计数应增加，刷新应归零。在启动服务的终端按 `Ctrl+C` 停止。若出现批处理退出提示，输入 `Y`。

如果终端仍选用旧版 Node，可以重新打开终端，或在项目目录运行 `$env:Path = "$(Join-Path (Get-Location) '.tools\node-v24.22.0-win-x64');$env:Path"`，在当前终端临时使用阶段 0 的便携版。

新检出工程时，用 Node.js 24 和 npm 11 执行 `npm.cmd ci` 安装锁定依赖。换到 Linux/UOS 时准备对应架构的 Node.js 24 和 npm 11，在项目根目录依次执行 `npm ci`、`npm run serve`。依赖实际来自公共 npm 仓库，首次安装需能够访问仓库或已有相应的本地缓存。

## 构建与排查

```powershell
npm.cmd run build
```

构建产物位于 `dist/`。用 HTTP 静态服务查看产物。部署时以站点根路径提供资源，使用 HTML5 history 的站点需要为前端路径配置 `index.html` 回退。开发时，编译错误先看运行 `serve` 的终端。页面与交互问题在浏览器 F12 的 Console、Network 和 Elements 中排查。

## 学习文档

- [工程结构与启动原理](docs/architecture.md)
- [14 阶段学习路线和小任务](docs/learning-roadmap.md)
- [当前进度和验收记录](docs/progress.md)
- [知识笔记](docs/knowledge-notes.md)
- [排障手册](docs/troubleshooting.md)
- [DUI3 与标准 Vue 对照](docs/dui3-mapping.md)

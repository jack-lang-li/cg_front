# 学习路线

始终在 `frontend-learning-lab` 内练习。每次选择一行任务，先读实际代码，再由学员按局部方案修改、运行并验收。表中路径以项目根目录为起点。未来文件名是定位建议，开始该任务时按当时的项目结构核对。验收确认后只更新对应任务和 [进度记录](progress.md)。

## 0 · 前端工程初始化

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 0-01 | Node、npm/Yarn、`node_modules`、Webpack、Vue Loader、动态导入、Vue/Router/Vuex、环境配置和 Git | 搭建并验证最小首页，沿浏览器启动链定位每个环节 | `package.json`、`vue.config.js`、`public/index.html`、`src/`、`.env.*`、`.gitignore` | 首页、阶段信息和可点击计数 | 能启动、渲染、计数和打包，能指出入口、挂载点、路由表与 Store | 已完成 |

阶段 0 的小步骤随同 `0-01` 一起验收。可以按顺序逐项复看。

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 0-01a | 运行时和依赖管理 | 核对命令版本及项目的已安装依赖 | `package.json`、`package-lock.json` | npm 可识别工程依赖和脚本 | 能说明 Node、npm、Yarn、锁文件和 `node_modules` 的职责 | 已完成 |
| 0-01b | HTML 模板、Webpack 和 Vue Loader | 启动服务并定位生成的 HTML 及其加载的脚本、图标 | `vue.config.js`、`public/index.html`、`src/assets/favicon.png` | 浏览器可访问开发首页 | 能在 Network 找到入口和图标，在 Elements 找到挂载容器 | 已完成 |
| 0-01c | Vue 初始化、Router 和 Vuex | 跟一次分块加载并操作计数按钮 | `src/main.js`、`src/bootstrap.js`、`src/App.vue`、`src/router/index.js`、`src/store/index.js`、`src/views/demo/CustomPage.vue` | 首页能渲染，计数可更新 | 能指出 `RouterView` 的匹配结果和状态从事件到显示的路径 | 已完成 |
| 0-01d | 生产构建、环境模式和 Git 文件边界 | 打包并区分源码、锁文件与本机生成目录 | `.env.*`、`dist/`、`.gitignore` | 生成生产 HTML 与静态资源 | 能对照开发与生产标题，并指出需要保留的工程文件 | 已完成 |

## 1 · HTML 页面基础

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 1-01 | `h1`、`h2`、`div`、`span`、元素嵌套 | 在首页增加静态设备区标题和容器 | `src/views/demo/CustomPage.vue` 的 `<template>` | 实验室主标题下出现设备管理区 | 用 Elements 找到设备区及其父元素，标题层级清晰 | 待验证 |
| 1-02 | `input`、`label`、`id`、`for`、`placeholder` | 加设备名称输入框 | `src/views/demo/CustomPage.vue` | 输入框可输入，标签说明含义 | 点击标签会聚焦输入框，输入后占位文字让出 | 待验证 |
| 1-03 | `select`、`option`、`value` | 加状态下拉框 | `src/views/demo/CustomPage.vue` | 能展开并选择示例状态 | 能指出显示文本和选项值的区别 | 待验证 |
| 1-04 | `form`、`button`、`type` | 把控件组织为查询表单，加查询与重置按钮 | `src/views/demo/CustomPage.vue` | 原生重置恢复初值，查询按钮作为静态占位 | 修改两个控件后点重置，初值恢复，点查询页面保持原位 | 待验证 |
| 1-05 | `table`、`thead`、`tbody`、`tr`、`th`、`td` | 写表头和两行静态设备数据 | `src/views/demo/CustomPage.vue` | 字段按列对齐 | 自己增减一列，每行单元格数与表头一致 | 已完成 |

## 2 · CSS 样式与布局

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 2-01 | 选择器、class、id、`scoped`、`background` | 给设备区设置局部容器样式 | `src/views/demo/CustomPage.vue` 的 `<style scoped>` | 设备区形成清晰内容边界 | 用 Elements 找到生效规则，实验室标题样式保持原效果 | 学习中 |
| 2-02 | 盒模型、宽高、`margin`、`padding`、`border` | 调整输入框尺寸和设备区内外间距 | `src/views/demo/CustomPage.vue` | 控件高度与间距统一 | 在 Computed 面板指出内容、内边距、边框和外边距 | 未开始 |
| 2-03 | `display`、Flex、`gap`、`flex-wrap` | 横向排列查询条件与按钮 | `src/views/demo/CustomPage.vue` | 宽屏同排，变窄时可换行 | 缩窄视口，按钮仍可点击，表单没有横向溢出 | 未开始 |
| 2-04 | 表格样式、`overflow-x` | 设置表头和单元格样式，并处理窄屏 | `src/views/demo/CustomPage.vue` | 表格横向滚动限制在容器内 | 在 360 像素视口能滚到最后一列 | 未开始 |
| 2-05 | CSS Grid、响应式列布局 | 用 Grid 排列标签和控件 | `src/views/demo/CustomPage.vue` | 查询字段对齐，小屏变为单列 | 调整视口验证列数和可读性，解释 Flex 与 Grid 在页面里的用途 | 未开始 |

## 3 · JavaScript 基础

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 3-01 | `let`、`const`、基本类型、对象、数组、`import/export` | 用模拟数组表达静态设备记录并从模块导入 | `src/views/demo/device-data.js`、`src/views/demo/CustomPage.vue` | 记录有名称、状态和唯一编号 | 在断点读出字段和值，能类比 Java DTO 和 List | 未开始 |
| 3-02 | 函数、箭头函数、作用域、`filter`、`some` | 编写关键词和状态查询函数 | `src/views/demo/device-query.js`、`device-data.js` | 按组合条件得到匹配集合 | 验证空条件、组合条件和无匹配，并比较原数组长度 | 未开始 |
| 3-03 | `map`、`find`、`forEach` | 写设备名称列表、按编号查找和状态统计 | `src/views/demo/device-query.js` | 从同一批记录获得三种结果 | 用固定样本核对统计、缺失编号和名称顺序 | 未开始 |
| 3-04 | 解构、展开、对象与数组引用、JSON 序列化 | 重置普通查询模型，观察浅复制与 JSON 往返 | `src/views/demo/device-query.js`、`CustomPage.vue` | 重置后默认查询参数恢复 | 通过断点解释对象别名、浅复制和嵌套共享的结果 | 未开始 |
| 3-05 | DOM、事件、事件对象和默认行为 | 在 Console 观察表单元素与原生事件 | `src/views/demo/CustomPage.vue`、浏览器 Elements/Console | 能定位元素和事件目标 | 用 F12 观察表单值与点击目标，说明原生重置发生在哪里 | 未开始 |
| 3-06 | Promise、`async/await`、`try/catch/finally` | 把一次模拟查询改为延迟返回并观察异常路径 | `src/views/demo/device-query.js` | 模拟成功和失败都能观察到调用顺序 | 错误能进入 `catch`，两条路径都执行 `finally` | 未开始 |

## 4 · Vue 3 基础与响应式

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 4-01 | SFC、`template`、`<script setup>`、`<style scoped>`、`ref`、`v-model` | 将设备名称输入绑定到响应式值 | `src/views/demo/CustomPage.vue` | 输入时页面能回显设备名称 | 在脚本中说明 `.value`，在模板中指出自动解包 | 未开始 |
| 4-02 | `v-for`、`:key`、`v-bind` | 把静态表格行改为根据数组渲染 | `src/views/demo/CustomPage.vue`、`device-data.js` | 数据条数决定实际行数 | 加一条记录后多一行，行键取稳定的设备编号 | 未开始 |
| 4-03 | `@click`、`v-if`、`v-show` | 将查询按钮接到筛选函数并加空结果反馈 | `src/views/demo/CustomPage.vue`、`device-query.js` | 点击更新表格，无记录时出现提示 | 验证结果与提示，使用 Elements 比较节点移除与隐藏 | 未开始 |
| 4-04 | `computed`、`watch`、`onMounted` | 显示派生数量，观察首次挂载与字段变化 | `src/views/demo/CustomPage.vue` | 记录数随结果更新，调试时可看到生命周期与侦听顺序 | 数量正确，能区分派生计算和副作用 | 未开始 |
| 4-05 | Options API、`data()`、`methods`、`mounted()` | 阅读少量同等逻辑的 Options API 片段 | `src/views/demo/CustomPage.vue`、`docs/knowledge-notes.md` | 能从两种风格定位状态、事件和生命周期 | 用自己的话把三个 Options API 位置对应到当前页面 | 未开始 |

## 5 · Vue 3 响应式深入与数据流

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 5-01 | 普通对象、`ref`、`reactive`、表单模型 | 把名称和状态组织成响应式查询模型 | `src/views/demo/CustomPage.vue` | 下拉框和输入框绑定同一个模型的字段 | 新增一个过滤字段并观察输入与模型同步 | 未开始 |
| 5-02 | 解构、`toRefs`、普通变量的快照 | 实验直接解构与 `toRefs` 后的页面更新 | `src/views/demo/CustomPage.vue` | 同一次输入可对照快照值和响应式值 | 能在实测中指出哪一个随原对象更新，并恢复正常绑定 | 未开始 |
| 5-03 | 表单草稿、对象复制、查询快照、重置 | 分离正在填写的条件和已经应用的条件 | `src/views/demo/CustomPage.vue`、`device-query.js` | 输入改变草稿，点查询才改变列表，重置恢复默认值 | 查询后继续输入，表格维持上次结果，重置回到全量 | 未开始 |
| 5-04 | `computed`、`watch`、事件、批量 DOM 更新、`nextTick` | 点击更新后读取新渲染结果 | `src/views/demo/CustomPage.vue` | 可观察状态立即变更与 DOM 刷新时机 | 断点对照 `await nextTick()` 前后的 DOM 值 | 未开始 |

## 6 · Vue 组件化

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 6-01 | 父子组件、局部导入、`defineProps` | 将表格提取成接收列表的子组件 | `src/views/demo/CustomPage.vue`、`src/components/DeviceTable.vue` | 查询后子组件显示父组件传入的数据 | 在父组件更新列表可刷新表格，子组件不修改 prop | 未开始 |
| 6-02 | `defineEmits`、`emit`、事件负载 | 将查询表单拆成子组件 | `src/views/demo/CustomPage.vue`、`src/components/DeviceSearchForm.vue` | 子组件发出查询与重置事件，父组件应用条件 | 用断点说清事件从按钮到父组件的顺序与参数 | 未开始 |
| 6-03 | `slot`、复用、表单契约 | 提取一小块用于后续编辑的设备字段表单 | `src/views/demo/CustomPage.vue`、`src/components/DeviceFields.vue` | 同一字段组件可通过 slot 呈现调用方提供的底部内容 | 能解释哪些内容来自 `props`、`emit` 和 slot，字段输入可验证 | 未开始 |
| 6-04 | 全局注册与局部注册 | 顺着绑定找到组件导入位置，并小范围试验 `app.component` | `src/bootstrap.js`、`src/views/demo/CustomPage.vue` | 能识别两种来源并解释适用场景 | 同一控件用两种方式分别渲染，最终只保留当前需要的注册 | 未开始 |

## 7 · Vue Router

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 7-01 | `path`、`name`、`RouterView`、`RouterLink` | 保留 `/` 为首页，为现有缺陷页设独立地址 | `src/router/index.js`、`src/App.vue`、`src/views/HomePage.vue`、`src/views/demo/CustomPage.vue` | 可通过导航打开首页和设备缺陷管理页 | 直接访问、链接跳转、刷新和后退都渲染对应页面 | 未开始 |
| 7-02 | 路由参数、`router.push` | 添加设备台账入口并用设备编号跳转 | `src/router/index.js`、`src/views/devices/EquipmentPage.vue`、缺陷页 | 跳转后台账能读到编号参数 | 按不同编号完成导航，能在路由对象中查到 `params` | 未开始 |
| 7-03 | `meta`、路由懒加载 | 添加设置示例页，使用 `meta` 标记标题 | `src/router/index.js`、`src/views/SettingsPage.vue` | 打开设置页时加载页面分块并显示标题 | 通过 Network 观察首次导航的页面请求，验证标题 | 未开始 |
| 7-04 | 路由守卫基础、标准路由与 `<route-config>` | 给一条示例路径加轻量守卫，记录路由对照 | `src/router/index.js`、`docs/dui3-mapping.md` | 命中特定示例条件时发生可解释的跳转 | 守卫有命中和未命中用例，能指出平台解析仍需查证 | 未开始 |

## 8 · Vuex 全局状态管理

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 8-01 | `state`、`getters`、局部与全局状态 | 选择一个需两个页面读取的显示偏好 | `src/store/index.js`、`src/views/SettingsPage.vue`、`src/App.vue` | 两处读取相同偏好，查询草稿留在页面 | 能指出每份状态的拥有者和读取者 | 未开始 |
| 8-02 | `mutations`、`commit` | 从设置页改变共享偏好 | `src/store/index.js`、`src/views/SettingsPage.vue` | 两处显示同步更新 | 断点沿点击、commit、mutation 找到更新路径 | 未开始 |
| 8-03 | `actions`、`dispatch`、`modules` | 给偏好加可观察的异步恢复动作并归入模块 | `src/store/modules/preferences.js`、`src/store/index.js`、设置页 | 动作完成后更新共享值 | 能验证调用命名空间，解释异步 action 与同步 mutation 各自职责 | 未开始 |

## 9 · HTTP 与 Axios

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 9-01 | 前后端分离、Axios、GET、Query、Promise | 用模拟 API 查询列表并映射到现有表格 | `package.json`、`src/api/defects.js`、缺陷页 | 筛选条件进入请求，响应记录显示在界面 | Network 中能对应请求参数、响应字段和表格列 | 未开始 |
| 9-02 | 环境配置、开发代理、CORS、Spring Boot | 将列表请求切换到个人环境中的 Spring Boot 接口 | `.env.*`、`vue.config.js`、`src/config/service.domain.js`、`src/api/defects.js` | 本地前后端联调可返回记录 | 用 Network 和后端日志定位同一请求，解释开发代理中的转发 | 未开始 |
| 9-03 | POST、PUT、DELETE、Path 参数、JSON Body | 为后续 CRUD 定义请求方法与 API 契约 | `src/api/defects.js` | 方法与后端契约一致，可单独调用验证 | 在模拟或本地 API 上逐一核对动词、路径、参数和响应 | 未开始 |
| 9-04 | Axios 实例、请求与响应拦截器、Token 基础、状态码 | 集中处理公开请求配置与统一错误 | `src/api/http.js`、`src/config/http.status.code.js`、`src/api/defects.js` | 调用方可获得易于处理的成功与异常结果 | 用模拟 401 验证错误路径，能指出授权头在何处设置 | 未开始 |
| 9-05 | `async/await`、`try/catch/finally`、加载与失败状态 | 在列表请求期间显示加载并在失败时给出反馈 | 缺陷页、`src/api/defects.js` | 慢请求、空结果和请求失败可区分 | 模拟延迟和失败，确认加载状态均能结束 | 未开始 |

## 10 · 完整企业 CRUD 页面

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 10-01 | 查询参数组装 | 按后端字段名组装正式查询条件 | 缺陷页、`src/api/defects.js` | 页面过滤条件作用于服务端列表 | 在 Network 检查空值、状态和关键字的传参 | 未开始 |
| 10-02 | 重置与重新加载 | 重置表单并请求默认列表 | 缺陷页、`src/components/DeviceSearchForm.vue` | 查询后重置可恢复初始条件 | 控件、请求参数和结果同步回到默认状态 | 未开始 |
| 10-03 | 列表字段映射与状态显示 | 显示必要业务列并显示状态文字 | `src/components/DeviceTable.vue`、`src/api/defects.js` | 服务端字段准确映射到表头与单元格 | 能排查一次前后端字段名不一致，未知状态可辨认 | 未开始 |
| 10-04 | 分页参数、页码与总数 | 接入服务端分页 | 缺陷页、`src/api/defects.js` | 切页更新结果，换查询条件回第一页 | 核对请求页码、页大小、末页和总数 | 未开始 |
| 10-05 | 表单弹窗、打开与关闭 | 用弹窗承载设备缺陷表单 | 缺陷页、`src/components/DeviceFields.vue` | 弹窗打开可编辑，取消可关闭 | 检查焦点、取消和重复打开时的初始内容 | 未开始 |
| 10-06 | 表单校验 | 添加一条必填校验及相邻提示 | `src/components/DeviceFields.vue` | 空字段触发反馈，填写后可提交 | 无效表单未触发写入方法，有效表单通过 | 未开始 |
| 10-07 | 新增、保存提示、请求互斥 | 连接新增请求和保存后刷新 | 缺陷页、`src/components/DeviceFields.vue`、`src/api/defects.js` | 保存成功后列表显示新记录 | 快速双击只产生一次写入，成功与失败都恢复按钮 | 未开始 |
| 10-08 | 编辑与数据回显、对象复制、共享表单 | 复用新增弹窗做编辑 | 缺陷页、`src/components/DeviceFields.vue`、`src/api/defects.js` | 已有值回显，更新保存后刷新 | 编辑再取消不会改变列表，确认保存才出现新值 | 未开始 |
| 10-09 | 详情与只读展示 | 从列表打开一条缺陷详情 | 缺陷页、`src/components/DefectDetails.vue`、`src/api/defects.js` | 展示所选记录的完整信息 | 用两个编号验证详情各自匹配 | 未开始 |
| 10-10 | 删除确认、列表刷新 | 加入单条删除与确认 | 缺陷页、`src/api/defects.js` | 确认后记录消失，取消保留 | 观察取消、成功、失败和末页删空四种结果 | 未开始 |
| 10-11 | Loading、空数据、异常提示 | 验证列表与保存的各类 UI 状态 | 缺陷页、表格和字段组件 | 加载中、空结果和错误时均有明确反馈 | 用慢响应、空数组和错误响应逐一验收 | 未开始 |

## 11 · DUI3 低代码平台专项

使用获准提供的脱敏平台输出或内部文档。平台组件的 props、事件、值格式和注册方式以实际材料为准。

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 11-01 | 创建页面、拖拽、预览、下载、推送流程 | 记录一次由平台配置到本地 Vue 文件的流程 | 脱敏页面输出、`docs/dui3-mapping.md` | 能定位生成结果及其来源 | 用实际文件指出 `<template>`、`<script setup>`、`<style scoped>` 和自定义块 | 未开始 |
| 11-02 | Row/Col、栅格 `span`、嵌套布局 | 依据文档调整一个列宽并对照 CSS 布局 | 脱敏布局片段、`docs/dui3-mapping.md` | 能说明容器、列和子控件的关系 | 修改前后可观察列宽差异，能指出实际栅格约束的证据 | 未开始 |
| 11-03 | `d-label`、`d-typeahead`、`d-button`、静态与动态 props | 对照一个查询区域，追踪控件的 `placeholder`、`size` 或 `mode` | 脱敏查询片段、`docs/dui3-mapping.md` | 能从标签找到属性和配置来源 | 能说明 `span="2"` 与 `:span="2"` 在 Vue 中传值的区别，所列 DUI3 props 均有依据 | 未开始 |
| 11-04 | `d-date-range-picker`、`d-pulldown`、`d-checkbox-group`、字段与数据源 | 追踪一个日期范围、一个下拉与一个多选字段的值 | 脱敏表单片段、`docs/dui3-mapping.md` | 能从模板定位绑定值和选项来源 | 用实际代码确认值类型、字段名和选项更新结果 | 未开始 |
| 11-05 | 组件事件、表单联动、接口请求、`state`、`extended_data` | 沿一次查询点击定位方法、状态和请求 | 脱敏脚本、`docs/dui3-mapping.md` | 能描述点击到响应回显的链路 | 以断点或请求记录验证参数，`model_cache_keys` 的语义有证据才更新 | 未开始 |
| 11-06 | HTML `id`、`class`、模板 `ref`、自动生成属性 | 查清一个模板引用的使用处与再生成影响 | 脱敏页面、`docs/dui3-mapping.md` | 知道哪些属性承担定位、样式或脚本访问职责 | 查全一次引用路径，在获准的副本上比较再生成差异并记录维护边界 | 未开始 |
| 11-07 | `<route-config>`、`meta`、解析入口及生成覆盖 | 对比一个平台路由与标准 Router 路由记录 | 脱敏路由块和相关配置、`src/router/index.js`、`docs/dui3-mapping.md` | 能找到配置入口及平台事实的证据 | 能解释两种配置的生效路径，缺失的内部实现保留待验证 | 未开始 |

## 12 · 浏览器调试与故障排查

| 编号 | 知识点 | 实操目标 | 涉及文件或工具 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 12-01 | Console、Network、入口加载、白屏 | 复现一次入口加载或运行时错误并恢复 | F12、`src/main.js`、`src/bootstrap.js` | 能区分缺少资源与脚本执行失败 | 记录首个错误、定位步骤、修复及复测结果 | 未开始 |
| 12-02 | Sources、断点、单步、Elements、Vue Devtools（可用时） | 排查一个按钮无反应或数据不更新的案例 | F12、缺陷页与子组件 | 从交互跟到事件、状态与 DOM | 能通过断点识别未进回调或状态未联动，并修复复测 | 未开始 |
| 12-03 | 表单校验、请求参数、响应检查 | 定位一例表单无法提交或字段映射错误 | F12、`src/components/DeviceFields.vue`、`src/api/defects.js` | 能区分校验、请求与回显阶段的错误 | 记录失败字段，修正后验证请求与界面 | 未开始 |
| 12-04 | HTTP 401、403、404、500 与跨域 | 用模拟错误和本地联调排查常见失败 | Network、`src/api/http.js`、开发代理配置 | 能根据状态与控制台找责任层 | 分别指出认证、权限、资源、服务和跨域的验证入口 | 未开始 |
| 12-05 | 浏览器路由 404、Webpack 构建失败、依赖冲突 | 分别演练路径回退和一次构建问题 | F12、`vue.config.js`、`src/router/index.js`、`package.json` | 能区分 HTTP 404、Router 未匹配与编译错误 | 记录最先出现的错误，恢复后刷新并重新构建 | 未开始 |

## 13 · 构建、部署与综合实战

| 编号 | 知识点 | 实操目标 | 涉及文件 | 预期效果 | 验收标准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 13-01 | 开发和生产模式、构建变量、产物 | 比较开发服务和生产包 | `.env.*`、`vue.config.js`、`dist/` | 能识别入口、异步分块、图片和环境配置结果 | 用 HTTP 加载 `dist/`，检查实际标签标题与资源请求 | 未开始 |
| 13-02 | Nginx、静态部署、前端路由回退 | 在本地部署产物并修正直接访问子路由 | `dist/`、本地 Nginx 配置、`src/router/index.js` | 首页和子路由都能直接访问或刷新 | 访问与刷新两条不同路由，静态资源返回正确内容 | 未开始 |
| 13-03 | API 代理、部署环境、Git 版本管理 | 在部署环境验证 API 并审阅发布差异 | 本地 Nginx 配置、`.env.production`、Git diff | 页面和 API 可通过同一站点访问 | 核对 Network、代理与后端日志，用 Git 指出发布文件边界 | 未开始 |
| 13-04 | 查询、表格、增删改、路由、API、异常处理 | 学员独立新增一个业务页面，先写设计再分小步自验 | 新业务页、对应 API 模块、`src/router/index.js` | 新页面可访问、读写且能提示异常 | 不查看完整答案，独立演示查询、增改删、路由刷新及失败恢复，由 Codex 复核 | 未开始 |

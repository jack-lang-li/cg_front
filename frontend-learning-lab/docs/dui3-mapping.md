# DUI3 与标准 Vue 对照

公司侧证据来自已提供的 `demoOne` 目录和 `CustomPage.vue` 摘录。表中「已见」指在这些材料里看到了写法，「待验证」指还需要实际生成代码、相关配置或内部文档确认运行方式。

| 通用能力 | 学习工程实现与位置 | 公司侧表现与证据位置 | 验证状态与修改方法 |
| --- | --- | --- | --- |
| 异步启动 | `src/main.js` 动态导入 `bootstrap.js`，后者创建应用、注册插件 | 已见 `demoOne/src/main.js` 的动态导入 | 入口写法已见。公司 `bootstrap.js` 的完整初始化、全局注册顺序待验证，读全文件后沿导入定位 |
| 页面结构 | `src/views/demo/CustomPage.vue` 使用 `<template>`、`<script setup>` 与 `<style scoped>` | 已见 `demoOne/src/views/cqsg/CustomPage.vue` 的对应块 | 块结构已见。改布局先定位模板的父子结构，改逻辑追到表单模型与回调 |
| 栅格布局 | 阶段 2 用 CSS Flex 和 Grid 练习父容器与子项布局，位置在页面样式段 | 已见 `Row`、`Col`、`:span="2"` | 布局嵌套已见，总列数、断点与 `span` 规则待验证。常见栅格用 `span` 表示跨列数量，实际取值范围需对照文档 |
| 控件与属性 | HTML 练习使用 `<label>`、`<input>`、`<button>`、`<select>` 等 | 已见 `d-button`、`d-label`、`d-typeahead`、`d-date-range-picker`、`d-pulldown`、`d-checkbox-group`。片段有 `mode="simple"` 和 `placeholder` | 标签及给出的字面写法已见。`mode`、`size`、`placeholder` 的实际效果、可选值和组件注册方式待验证。修改前先找组件文档或定义 |
| 动态属性与事件 | `:prop` 求值后传给组件，`@click` 在首页接收按钮点击，阶段 4–6 练习 `v-model` 和 `emit` | `:span="2"` 已见。事件名、`v-model` 绑定键、事件负载待查例子 | Vue 中 `:span="2"` 传数字表达式，`span="2"` 传字面字符串。定位公司控件的 `@...`、`:...` 与 `v-model...` 后再改对应方法与字段 |
| DOM 标识与引用 | `public/index.html` 的 `id="app"` 作为挂载定位。`class` 用于样式。模板 `ref` 由 Vue 管理，用于在挂载后访问元素或组件实例 | 已见自动生成的 `id`、`ref` 与 `class="default-slot"` 示例 | 各属性用途和再生成行为待验证。先搜索属性值和模板引用的读取处，再在获准副本中做小改动并比较生成前后的差异 |
| 响应式表单模型 | 首页用 `computed` 读取 Store，阶段 5 将实验 `reactive`、解构和 `toRefs` | 已见 `reactive`、`toRefs`，以及 `state`、`extended_data`、`model_cache_keys` 名称 | 字段结构和 `model_cache_keys` 语义待验证。改字段先追踪模板、初始值、事件、请求参数和重置位置 |
| 路由与元数据 | `src/router/index.js` 使用 `createRouter({ routes })`。阶段 7 加 `meta`，在组件或守卫中按需读取 | 摘录含自定义 `<route-config>`，列出 `name`、`path`、`component` 与 `meta` | 配置块已见，消费它的构建或平台工具待验证。标准 Vue Router 使用交给 `createRouter` 的路由记录。`noAuth` 是否生效也需查守卫或平台逻辑 |
| 平台生成边界 | 学习工程通过版本差异审阅人工改动 | 创建、拖拽、预览、下载或推送为用户描述的工作流 | 哪些区域由平台持有、哪些文件可稳定扩展待验证。用脱敏材料记录生成来源、保留改动位置与 diff 检查结果 |
| 企业专用依赖 | 当前使用公开的 Vue、Router、Vuex 和构建工具 | 用户提供了 `@syy/*` 的包名 | API 与职责待验证。后续根据实际调用点、构建配置或授权文档确认 |

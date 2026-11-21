<script setup>
import { computed, reactive, ref } from 'vue';

const projects = [
  {
    id: 1,
    no: 'CG-001',
    name: '服务器扩容',
    businessType: '股东项目',
    projectType: '采购',
    org: '示例采购单位',
    dept: '信息部',
    contact: '联系人甲',
    createdOn: '2026-11-02',
    status: '草稿',
    consistency: '—',
  },
  {
    id: 2,
    no: 'CG-002',
    name: '数据库软件采购',
    businessType: '股东项目',
    projectType: '采购',
    org: '示例采购单位',
    dept: '信息部',
    contact: '联系人乙',
    createdOn: '2026-11-06',
    status: '审批中',
    consistency: '—',
  },
  {
    id: 3,
    no: 'CG-003',
    name: '终端设备采购',
    businessType: '股东项目',
    projectType: '采购',
    org: '示例采购单位',
    dept: '综合部',
    contact: '联系人丙',
    createdOn: '2026-11-10',
    status: '已归档',
    consistency: '一致',
  },
  {
    id: 4,
    no: 'CG-004',
    name: '网络设备租赁',
    businessType: '非股东项目',
    projectType: '租赁',
    org: '示例交付单位',
    dept: '交付部',
    contact: '联系人丁',
    createdOn: '2026-11-15',
    status: '/',
    consistency: '—',
  },
];

const columns = [
  { key: 'no', label: '采购审查单号' },
  { key: 'name', label: '项目名称' },
  { key: 'businessType', label: '项目交付性质' },
  { key: 'projectType', label: '项目类型' },
  { key: 'org', label: '采购申请单位' },
  { key: 'dept', label: '部门' },
  { key: 'contact', label: '联系人' },
  { key: 'createdOn', label: '创建时间' },
  { key: 'status', label: '审批状态' },
  { key: 'consistency', label: '一致性' },
];

const statCards = [
  { label: '审查项目总数', value: projects.length },
  {
    label: '待归档/已归档',
    value: projects.filter(({ status }) =>
      ['已通过', '待归档', '已归档'].includes(status),
    ).length,
  },
  {
    label: '审批中',
    value: projects.filter(({ status }) =>
      ['审批中', '已推送'].includes(status),
    ).length,
  },
  {
    label: '草稿',
    value: projects.filter(({ status }) => status === '草稿').length,
  },
];

const emptyFilters = { keyword: '', businessType: '', from: '', to: '' };
const draft = reactive({ ...emptyFilters });
const applied = ref({ ...emptyFilters });

const rows = computed(() => {
  const { keyword, businessType, from, to } = applied.value;
  return projects.filter(
    (project) =>
      project.name.includes(keyword) &&
      (!businessType || project.businessType === businessType) &&
      (!from || project.createdOn >= from) &&
      (!to || project.createdOn <= to),
  );
});

function applyFilters() {
  applied.value = { ...draft };
}

function resetFilters() {
  Object.assign(draft, emptyFilters);
  applyFilters();
}
</script>

<template>
  <h1>采购技术审查</h1>

  <div class="stat-row">
    <div v-for="card in statCards" :key="card.label" class="panel stat">
      <strong>{{ card.value }}</strong>
      <span>{{ card.label }}</span>
    </div>
  </div>

  <form class="panel filters" @submit.prevent="applyFilters">
    <RouterLink :to="{ name: 'procurement-review-new' }">新增</RouterLink>
    <input
      v-model.trim="draft.keyword"
      aria-label="项目名称"
      placeholder="请输入项目名称"
    />
    <span>创建时间</span>
    <input
      v-model="draft.from"
      type="date"
      aria-label="开始日期"
      :max="draft.to || undefined"
    />
    <span>至</span>
    <input
      v-model="draft.to"
      type="date"
      aria-label="结束日期"
      :min="draft.from || undefined"
    />

    <select v-model="draft.businessType" aria-label="项目交付性质">
      <option value="">项目交付性质</option>
      <option>股东项目</option>
      <option>非股东项目</option>
    </select>

    <button type="submit">查询</button>
    <button type="button" @click="resetFilters">重置</button>
  </form>

  <div class="panel table-panel">
    <table aria-label="采购技术审查项目">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" scope="col">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in rows" :key="project.id">
          <td v-for="column in columns" :key="column.key">
            {{ project[column.key] }}
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="table-footer" role="status">共 {{ rows.length }} 条记录</div>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 14px;
  font-size: 20px;
}
.panel {
  background: white;
  border: 1px solid #e0e6ee;
  border-radius: 6px;
}
.stat-row,
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
.stat {
  flex: 1 0 130px;
  padding: 12px 16px;
}
.stat strong {
  display: block;
  color: #165dff;
  font-size: 22px;
}
.filters {
  align-items: center;
  padding: 12px;
}
.filters :is(input, select, button) {
  padding: 6px 8px;
  font: inherit;
  border: 1px solid #ccd5e1;
  border-radius: 4px;
}
.filters button {
  padding-inline: 12px;
  cursor: pointer;
}
.filters button[type='submit'] {
  background: #165dff;
  color: white;
}
.table-panel {
  overflow-x: auto;
}
table {
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  font-size: 14px;
}
th,
td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #edf0f4;
}
th {
  background: #f4f7fb;
}
.table-footer {
  padding: 10px 12px;
}
</style>

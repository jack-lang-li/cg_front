<script setup>
import { reactive, watch } from 'vue';

const form = reactive({
  no: '',
  name: '',
  budget: '',
  businessType: '股东项目',
  assetBelong: '',
  recordStatus: '未备案',
  recordNo: '',
  deliveryDeadline: '',
  deliveryStatus: '未交付',
  deliveryDate: '',
  delivery: '',
  projectType: [],
  directed: '',
  org: '',
  dept: '',
  contact: '',
  phone: '',
  remark: '',
});

watch(
  () => form.businessType,
  (businessType) => {
    if (businessType === '股东项目') {
      form.assetBelong = '';
    }
  },
);
</script>

<template>
  <h1>采购技术审查信息填报</h1>
  <section class="basic-info" aria-labelledby="review-basic-info">
    <h2 id="review-basic-info">基本信息</h2>
    <div class="field-row">
      <label for="review-no">采购审查单号</label>
      <input
        id="review-no"
        :value="form.no"
        type="text"
        placeholder="保存后系统自动生成（独立于项目编号）"
        readonly
      />
    </div>
    <fieldset class="option-group">
      <legend>项目交付性质 *</legend>

      <label>
        <input
          type="radio"
          name="review-business-type"
          v-model="form.businessType"
          value="股东项目"
        />
        股东项目
      </label>

      <label>
        <input
          type="radio"
          name="review-business-type"
          v-model="form.businessType"
          value="非股东项目"
        />
        非股东项目
      </label>
    </fieldset>
    <fieldset class="option-group">
      <legend>项目类型 *</legend>

      <label>
        <input type="checkbox" v-model="form.projectType" value="租赁" />
        租赁
      </label>

      <label>
        <input type="checkbox" v-model="form.projectType" value="采购" />
        采购
      </label>
    </fieldset>
    <fieldset class="option-group">
      <legend>定向寻源 *</legend>

      <label>
        <input
          type="radio"
          name="review-directed"
          v-model="form.directed"
          value="是"
          required
        />
        是
      </label>

      <label>
        <input
          type="radio"
          name="review-directed"
          v-model="form.directed"
          value="否"
          required
        />
        否
      </label>
    </fieldset>
    <div class="field-row">
      <label for="review-delivery">
        交付单位<span v-if="form.businessType === '非股东项目'"> *</span>
      </label>
      <input
        id="review-delivery"
        v-model.trim="form.delivery"
        type="text"
        placeholder="请输入交付单位"
        :required="form.businessType === '非股东项目'"
      />
    </div>
    <section
      v-if="form.businessType === '非股东项目'"
      class="non-shareholder"
      aria-labelledby="review-non-shareholder-title"
    >
      <h3 id="review-non-shareholder-title">非股东项目备案与交付信息</h3>

      <div class="field-row">
        <label for="review-asset-belong">资产归属 *</label>
        <input
          id="review-asset-belong"
          v-model.trim="form.assetBelong"
          type="text"
          placeholder="请输入资产归属"
          required
        />
      </div>
      <div class="field-row">
        <label for="review-record-status">备案状态</label>
        <select id="review-record-status" v-model="form.recordStatus">
          <option value="未备案">未备案</option>
          <option value="已备案">已备案</option>
          <option value="已推送数字运营平台">已推送数字运营平台</option>
        </select>
      </div>
      <div class="field-row">
        <label for="review-record-no">备案编号</label>
        <input
          id="review-record-no"
          v-model.trim="form.recordNo"
          type="text"
          placeholder="备案后自动带出"
        />
      </div>
      <div class="field-row">
        <label for="review-delivery-deadline">计划交付时间</label>
        <input
          id="review-delivery-deadline"
          v-model="form.deliveryDeadline"
          type="date"
        />
      </div>
      <div class="field-row">
        <label for="review-delivery-status">交付闭环状态</label>
        <select id="review-delivery-status" v-model="form.deliveryStatus">
          <option value="未交付">未交付</option>
          <option value="交付中">交付中</option>
          <option value="已闭环">已闭环</option>
        </select>
      </div>
      <div class="field-row">
        <label for="review-delivery-date">实际交付时间</label>
        <input
          id="review-delivery-date"
          v-model="form.deliveryDate"
          type="date"
        />
      </div>
    </section>
    <div class="field-row">
      <label for="review-org">采购申请单位 *</label>
      <input
        id="review-org"
        v-model.trim="form.org"
        type="text"
        placeholder="请输入采购申请单位"
        required
      />
    </div>
    <div class="field-row">
      <label for="review-dept">部门名称 *</label>
      <input
        id="review-dept"
        v-model.trim="form.dept"
        type="text"
        placeholder="请输入部门名称"
        required
      />
    </div>
    <div class="field-row">
      <label for="review-contact">联系人 *</label>
      <input
        id="review-contact"
        v-model.trim="form.contact"
        type="text"
        placeholder="请输入联系人"
        required
      />
    </div>
    <div class="field-row">
      <label for="review-phone">联系电话 *</label>
      <input
        id="review-phone"
        v-model.trim="form.phone"
        type="tel"
        placeholder="请输入联系电话"
        required
      />
    </div>
    <div class="field-row">
      <label for="review-project-name">项目名称 *</label>
      <input
        id="review-project-name"
        v-model.trim="form.name"
        type="text"
        placeholder="请输入项目名称"
        required
      />
    </div>

    <div class="field-row">
      <label for="review-budget">采购预算总金额（万元） *</label>
      <input
        id="review-budget"
        v-model="form.budget"
        type="number"
        step="any"
        placeholder="请输入采购预算总金额"
        required
      />
    </div>
    <div class="field-row remark-row">
      <label for="review-remark">备注</label>
      <textarea
        id="review-remark"
        v-model.trim="form.remark"
        placeholder="请输入备注"
      ></textarea>
    </div>
    <RouterLink :to="{ name: 'procurement-reviews' }">取消</RouterLink>
  </section>
</template>

<style scoped>
.basic-info {
  padding: 14px 18px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fff;
  font-size: 14px;
}
.basic-info h2 {
  width: fit-content;
  margin: 0 0 16px;
  padding: 6px 14px;
  border: 1px solid #b7d8ff;
  border-radius: 6px;
  background: #e8f3ff;
  font-size: 15px;
}
.option-group {
  min-width: 0;
  margin: 0 0 12px;
  padding: 0;
  border: 0;
}
.option-group legend {
  float: left;
  margin-right: 12px;
  padding: 0;
}
.option-group label + label {
  margin-left: 16px;
}
.option-group legend,
.field-row > label {
  width: 12em;
  text-align: right;
}
.field-row {
  display: grid;
  grid-template-columns: 12em minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.field-row > input,
.field-row > select,
.field-row > textarea {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font: inherit;
}

.non-shareholder {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px dashed #d9dfe5;
  border-radius: 8px;
  background: #fafbfc;
}
.non-shareholder h3 {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 13px;
}
.non-shareholder > .field-row {
  grid-template-columns: minmax(0, 1fr);
  gap: 4px;
  margin-bottom: 0;
}
.non-shareholder > .field-row > label {
  width: auto;
  text-align: left;
}
.remark-row {
  align-items: start;
}
.remark-row > label {
  padding-top: 7px;
}
.field-row > textarea {
  min-height: 88px;
  padding: 7px 10px;
  resize: vertical;
}
.field-row > input[readonly] {
  background: #f5f6f7;
}
</style>

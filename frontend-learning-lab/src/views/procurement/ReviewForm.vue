<script setup>
import { reactive, watch, watchEffect } from 'vue';

const productCategories = [
  '服务器',
  '工作站/PC终端',
  '存储设备',
  '数据中心交换机',
  '防火墙/网安设备',
  '其他16类硬件',
  '基础软件（操作系统/数据库/中间件）',
  '业务系统软件',
  'AI类相关软件',
  '软硬一体化设备',
];
const productColumns = [
  { label: '操作' },
  { label: '产品名称' },
  { label: '软件/硬件' },
  { label: '管控品类' },
  { label: '数量' },
  { label: '金额（万元）' },
  { label: '是否有集团框招', required: true },
  { label: '是否使用集团框招', required: true },
  { label: '未走框架原因' },
  { label: '技术参数要求' },
];

const frameworkReasons = [
  '框架版本性能不满足要求',
  '框架配置不满足项目要求',
  '维保期限/服务期不匹配',
  '供货周期不满足工期',
  '框架目录未覆盖该品类',
  '技术路线特殊要求',
  '预算/价格因素',
  '其他/未说明',
];
const form = reactive({
  products: [],
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
  purchaseTime: '',
  control: '',
  specFiles: [],
  devFiles: [],
  otherFiles: [],
});
let nextProductId = 1;

function addProductRow() {
  form.products.push({
    id: nextProductId,
    name: '',
    kind: '',
    controlledCategory: '',
    quantity: '',
    amount: '',
    hasFramework: '',
    usesFramework: '',
    frameworkReason: '',
    param: '',
  });
  nextProductId += 1;
}
function removeProductRow(id) {
  form.products = form.products.filter((product) => product.id !== id);
}

function fillFrameworkUsage(product, availability) {
  if (availability === '是' && product.usesFramework === '') {
    product.usesFramework = '是';
  }
}

function needsFrameworkReason(product) {
  return product.hasFramework === '是' && product.usesFramework === '否';
}

watchEffect(() => {
  for (const product of form.products) {
    if (!needsFrameworkReason(product)) {
      product.frameworkReason = '';
    }
  }
});

watch(
  () => form.businessType,
  (businessType) => {
    if (businessType === '股东项目') {
      form.assetBelong = '';
    }
  },
);

function addAttachmentFiles(event, files) {
  const input = event.target;

  for (const file of input.files) {
    if (!files.some((selectedFile) => selectedFile.name === file.name)) {
      files.push(file);
    }
  }

  input.value = '';
}
function removeAttachmentFile(files, fileName) {
  const index = files.findIndex((file) => file.name === fileName);
  if (index !== -1) {
    files.splice(index, 1);
  }
}
</script>

<template>
  <header class="review-header">
    <h1>采购技术审查信息填报</h1>
    <div class="review-header-actions">
      <button type="button" disabled>保存</button>
      <button type="button" class="primary-action" disabled>提交审核</button>
    </div>
  </header>
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
    <div class="basic-info-columns">
      <fieldset class="option-group">
        <legend>项目交付性质 <span class="required-mark">*</span></legend>
        <div class="option-content">
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
          <p class="field-note">
            非股东项目仅做备案、不开展自主可控管控审查，须填写交付单位
          </p>
        </div>
      </fieldset>
      <fieldset class="option-group">
        <legend>项目类型 <span class="required-mark">*</span></legend>
        <div class="option-content">
          <label>
            <input type="checkbox" v-model="form.projectType" value="租赁" />
            租赁
          </label>

          <label>
            <input type="checkbox" v-model="form.projectType" value="采购" />
            采购
          </label>
          <p class="field-note">
            类型判断以项目名称、项目内容及项目数据书为依据，支持人工填报，请按项目实际构成勾选
          </p>
        </div>
      </fieldset>
      <fieldset class="option-group">
        <legend>定向寻源 <span class="required-mark">*</span></legend>

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
          交付单位<span
            v-if="form.businessType === '非股东项目'"
            class="required-mark"
            >*</span
          >
        </label>
        <input
          id="review-delivery"
          v-model.trim="form.delivery"
          type="text"
          placeholder="请输入交付单位"
          :required="form.businessType === '非股东项目'"
        />
      </div>
    </div>
    <section
      v-if="form.businessType === '非股东项目'"
      class="non-shareholder"
      aria-labelledby="review-non-shareholder-title"
    >
      <h3 id="review-non-shareholder-title">非股东项目备案与交付信息</h3>

      <div class="field-row">
        <label for="review-asset-belong"
          >资产归属 <span class="required-mark">*</span></label
        >
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
    <div class="basic-info-columns">
      <div class="field-row">
        <label for="review-org"
          >采购申请单位 <span class="required-mark">*</span></label
        >
        <input
          id="review-org"
          v-model.trim="form.org"
          type="text"
          placeholder="请输入采购申请单位"
          required
        />
      </div>
      <div class="field-row">
        <label for="review-dept"
          >部门名称 <span class="required-mark">*</span></label
        >
        <input
          id="review-dept"
          v-model.trim="form.dept"
          type="text"
          placeholder="请输入部门名称"
          required
        />
      </div>
      <div class="field-row">
        <label for="review-contact"
          >联系人 <span class="required-mark">*</span></label
        >
        <input
          id="review-contact"
          v-model.trim="form.contact"
          type="text"
          placeholder="请输入联系人"
          required
        />
      </div>
      <div class="field-row">
        <label for="review-phone"
          >联系电话 <span class="required-mark">*</span></label
        >
        <input
          id="review-phone"
          v-model.trim="form.phone"
          type="tel"
          placeholder="请输入联系电话"
          required
        />
      </div>
    </div>
    <div class="field-row">
      <label for="review-project-name"
        >项目名称 <span class="required-mark">*</span></label
      >
      <input
        id="review-project-name"
        v-model.trim="form.name"
        type="text"
        placeholder="请输入项目名称"
        required
      />
    </div>

    <div class="field-row">
      <label for="review-budget"
        >采购预算总金额（万元） <span class="required-mark">*</span></label
      >
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
    <section class="product-details" aria-labelledby="review-product-details">
      <div class="product-details-heading">
        <h3 id="review-product-details">采购产品明细</h3>
        <span class="product-details-hint">技术参数要求支持 AI 预填充</span>
      </div>
      <div class="product-table-scroll">
        <table>
          <thead>
            <tr>
              <th
                v-for="column in productColumns"
                :key="column.label"
                scope="col"
              >
                {{ column.label }}
                <span v-if="column.required" class="required-mark">*</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="form.products.length === 0">
              <td :colspan="productColumns.length">暂无采购产品明细</td>
            </tr>
            <tr v-for="product in form.products" :key="product.id">
              <td>
                <button
                  type="button"
                  class="remove-product"
                  aria-label="删除产品明细"
                  @click="removeProductRow(product.id)"
                >
                  ×
                </button>
              </td>
              <td>
                <input
                  class="product-input"
                  v-model.trim="product.name"
                  type="text"
                  aria-label="产品名称"
                  placeholder="请输入产品名称"
                />
              </td>
              <td>
                <input
                  class="product-input"
                  v-model.trim="product.kind"
                  type="text"
                  aria-label="软件/硬件"
                  placeholder="软件/硬件"
                />
              </td>
              <td>
                <select
                  class="product-input"
                  v-model="product.controlledCategory"
                  aria-label="管控品类"
                >
                  <option value="">请选择管控品类</option>
                  <option
                    v-for="category in productCategories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  class="product-input"
                  v-model="product.quantity"
                  type="number"
                  step="1"
                  aria-label="数量"
                  placeholder="数量"
                />
              </td>
              <td>
                <input
                  class="product-input"
                  v-model="product.amount"
                  type="number"
                  step="0.01"
                  aria-label="金额（万元）"
                  placeholder="金额"
                />
              </td>
              <td>
                <select
                  class="product-input"
                  v-model="product.hasFramework"
                  @change="fillFrameworkUsage(product, $event.target.value)"
                  aria-label="是否有集团框招"
                >
                  <option value="">请选择</option>
                  <option value="是">是</option>
                  <option value="否">否</option>
                </select>
              </td>
              <td>
                <select
                  class="product-input"
                  v-model="product.usesFramework"
                  aria-label="是否使用集团框招"
                >
                  <option value="">请选择</option>
                  <option value="是">是</option>
                  <option value="否">否</option>
                </select>
              </td>
              <td>
                <select
                  class="product-input framework-reason"
                  v-model="product.frameworkReason"
                  aria-label="未走框架原因"
                  :disabled="!needsFrameworkReason(product)"
                  :required="needsFrameworkReason(product)"
                >
                  <option value="">请选择原因</option>
                  <option
                    v-for="reason in frameworkReasons"
                    :key="reason"
                    :value="reason"
                  >
                    {{ reason }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  class="product-input"
                  v-model.trim="product.param"
                  type="text"
                  aria-label="技术参数要求"
                  placeholder="请输入技术参数要求"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" class="add-product" @click="addProductRow">
        ＋ 新增明细
      </button>
    </section>
    <div class="field-row">
      <label for="review-purchase-time"
        >计划采购时间/时间段 <span class="required-mark">*</span></label
      >
      <input
        id="review-purchase-time"
        v-model.trim="form.purchaseTime"
        type="text"
        placeholder="例如：2026年第四季度 / 2026-10-01 至 2026-12-31"
        required
      />
    </div>
    <fieldset class="option-group">
      <legend>
        采购产品是否符合自主可控要求 <span class="required-mark">*</span>
      </legend>
      <label v-for="option in ['符合', '不符合', '不涉及']" :key="option">
        <input
          type="radio"
          name="review-control"
          v-model="form.control"
          :value="option"
          required
        />
        {{ option }}
      </label>
    </fieldset>
    <div class="field-row">
      <span class="attachment-label" id="review-attachments-label"
        >附件上传 <span class="required-mark">*</span></span
      >
      <div role="group" aria-labelledby="review-attachments-label">
        <div class="attachment-actions">
          <template
            v-for="(label, field) in {
              specFiles: '技术规范书',
              devFiles: '技术偏离表',
            }"
            :key="field"
          >
            <span
              v-for="file in form[field]"
              :key="file.name"
              class="attachment-file"
            >
              {{ file.name }}
              <button
                type="button"
                class="attachment-remove"
                :aria-label="'移除' + label + ' ' + file.name"
                @click="removeAttachmentFile(form[field], file.name)"
              >
                ×
              </button>
            </span>
            <label class="attachment-add" :title="label">
              ＋
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                multiple
                :aria-label="'选择' + label"
                @change="addAttachmentFiles($event, form[field])"
              />
            </label>
          </template>
        </div>
        <small class="attachment-hint">
          支持上传 PDF、Word、Excel，要求上传技术规范书或技术偏离表
        </small>
      </div>
    </div>
    <div class="field-row">
      <span class="attachment-label" id="review-other-attachments-label">
        其他附件
      </span>
      <div role="group" aria-labelledby="review-other-attachments-label">
        <div class="attachment-actions">
          <span
            v-for="file in form.otherFiles"
            :key="file.name"
            class="attachment-file"
          >
            {{ file.name }}
            <button
              type="button"
              class="attachment-remove"
              :aria-label="'移除其他附件 ' + file.name"
              @click="removeAttachmentFile(form.otherFiles, file.name)"
            >
              ×
            </button>
          </span>
          <label class="attachment-add" title="其他附件">
            ＋
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              multiple
              aria-label="选择其他附件"
              @change="addAttachmentFiles($event, form.otherFiles)"
            />
          </label>
        </div>
        <small class="attachment-hint">
          支持上传 PDF、Word、Excel，相关佐证材料
        </small>
      </div>
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
.basic-info h2,
.product-details-heading {
  margin: 0 0 16px;
  padding: 6px 14px;
  border: 1px solid #b7d8ff;
  border-radius: 6px;
  background: #e8f3ff;
  font-size: 15px;
}
.basic-info h2 {
  width: fit-content;
}
.product-details-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  padding: 10px 14px;
  color: #1d2129;
}
.product-details-heading::before {
  content: '';
  flex: 0 0 4px;
  height: 16px;
  border-radius: 2px;
  background: #165dff;
}
.product-details-heading h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}
.product-details-hint {
  color: #86909c;
  font-size: 12px;
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
.field-row > textarea,
.product-input {
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
.product-details {
  margin: 22px 0 12px;
}
.product-table-scroll {
  overflow-x: auto;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
}
.product-table-scroll table {
  width: 100%;
  min-width: 1040px;
  border-collapse: collapse;
}
.product-table-scroll :is(th, td) {
  padding: 8px 10px;
  text-align: left;
}
.product-table-scroll th {
  background: #f7f8fa;
  border-bottom: 1px solid #e8e8e8;
  white-space: nowrap;
}
.add-product,
.remove-product {
  padding: 8px 0;
  border: 0;
  background: transparent;
  color: #165dff;
  font: inherit;
  cursor: pointer;
}
.remove-product {
  color: #cf1322;
}
.framework-reason {
  background: #fffbe6;
}
.framework-reason:disabled {
  background: #f5f6f7;
}
.attachment-label {
  text-align: right;
}
.attachment-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.attachment-add {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
  border: 1px dashed #165dff;
  border-radius: 4px;
  color: #165dff;
  font-size: 20px;
}
.attachment-add input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.attachment-add:focus-within {
  outline: 2px solid #165dff;
  outline-offset: 2px;
}
.attachment-file {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #e8f3ff;
  overflow-wrap: anywhere;
}
.attachment-remove {
  padding: 0 2px;
  border: 0;
  background: transparent;
  color: #165dff;
  font: inherit;
  cursor: pointer;
}
.attachment-hint {
  display: block;
  margin-top: 6px;
  color: #666;
}
.review-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
.review-header h1 {
  margin: 0;
  font-size: 20px;
}
.review-header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-inline-start: auto;
}
.review-header-actions button {
  padding: 6px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #303133;
  font: inherit;
}
.review-header-actions .primary-action {
  border-color: #165dff;
  background: #165dff;
  color: #fff;
}
.review-header-actions button:disabled {
  opacity: 0.65;
}
.basic-info-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 28px;
  margin-bottom: 12px;
}
.basic-info-columns > .field-row,
.basic-info-columns > .option-group {
  margin-bottom: 0;
}
@media (max-width: 1100px) {
  .basic-info-columns {
    grid-template-columns: minmax(0, 1fr);
  }
}
.option-content {
  display: flow-root;
}
.field-note {
  margin: 6px 0 0;
  color: #86909c;
  font-size: 12px;
  line-height: 1.5;
}
.required-mark {
  color: #f53f3f;
  margin-inline-start: 3px;
}
</style>

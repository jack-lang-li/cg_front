<template>
  <main class="lab-page">
    <p class="stage">阶段 0 · 工程初始化</p>
    <h1>前端学习实验室</h1>
    <p class="intro">以设备缺陷管理为练习场景，逐步学习企业后台页面开发。</p>
    <div class="device-section">
      <h2>设备管理</h2>
      <p>示例设备为<span>一号巡检泵</span>。</p>
      <form @submit.prevent>
        <div>
          <label for="device-name">设备名称</label>
          <input id="device-name" type="text" placeholder="请输入设备名称" />
        </div>
        <div>
          <label for="device-status">设备状态</label>
          <select id="device-status">
            <option value="">全部状态</option>
            <option value="running">运行中</option>
            <option value="stopped">已停用</option>
          </select>
        </div>
        <button type="submit">查询</button>
        <button type="reset">重置</button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">设备编号</th>
            <th scope="col">设备名称</th>
            <th scope="col">设备状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EQ-001</td>
            <td>一号巡检泵</td>
            <td>运行中</td>
          </tr>
          <tr>
            <td>EQ-002</td>
            <td>二号巡检泵</td>
            <td>已停用</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="practice-count" aria-live="polite">
      练习计数：{{ practiceCount }}
    </p>
    <button type="button" @click="incrementPracticeCount">增加练习计数</button>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const practiceCount = computed(() => store.state.practiceCount);

function incrementPracticeCount() {
  store.commit('incrementPracticeCount');
}
</script>

<style scoped>
.lab-page {
  box-sizing: border-box;
  max-width: 42rem;
  margin: clamp(2rem, 12vh, 7rem) auto 0;
  padding: clamp(1.5rem, 5vw, 3rem);
}

.stage {
  margin: 0 0 0.5rem;
  color: #325777;
  font-size: 0.9rem;
  font-weight: 600;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 7vw, 3.25rem);
  line-height: 1.2;
}

.intro {
  margin: 0.75rem 0 0;
  color: #42576d;
}

.practice-count {
  margin: 2rem 0 0.75rem;
}

button {
  padding: 0.55rem 0.95rem;
  border: 1px solid transparent;
  border-radius: 0.35rem;
  background: #174d83;
  color: #fff;
  font: inherit;
  cursor: pointer;
}

button:hover {
  background: #103b67;
}

button:focus-visible {
  outline: 2px solid #174d83;
  outline-offset: 3px;
}
</style>

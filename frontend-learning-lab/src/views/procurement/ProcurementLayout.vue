<template>
  <div class="procurement-layout">
    <aside class="sidebar">
      <div class="brand">供应链治理平台</div>
      <nav aria-label="采购管理">
        <p class="menu-title">采购管理</p>
        <RouterLink to="/procurement/reviews">采购技术审查</RouterLink>
        <RouterLink to="/procurement/statistics">采购统计分析</RouterLink>
      </nav>
    </aside>

    <main class="workspace">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.procurement-layout {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  min-height: 100vh;
}
.sidebar {
  padding: 20px 12px;
  background: #002c5c;
  color: white;
}
.brand {
  padding: 0 8px 16px;
  font-weight: 700;
}
.menu-title {
  margin: 4px 8px;
}
.sidebar a {
  display: block;
  padding: 8px 12px;
  color: #dbe9ff;
  text-decoration: none;
}
.sidebar a:hover,
.sidebar a.router-link-active {
  background: #165dff;
  color: white;
  border-radius: 4px;
}
.workspace {
  padding: 16px 20px;
}
</style>

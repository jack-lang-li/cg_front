import(/* webpackChunkName: "bootstrap" */ './bootstrap.js')
  .then(({ bootstrap }) => bootstrap())
  .catch((error) => {
    console.error('前端学习实验室启动失败', error);
  });

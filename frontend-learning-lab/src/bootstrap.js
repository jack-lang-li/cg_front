import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

export async function bootstrap() {
  const app = createApp(App);
  app.use(router);
  app.use(store);
  await router.isReady();
  app.mount('#app');
}

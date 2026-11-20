import { createRouter, createWebHistory } from 'vue-router';
import CustomPage from '../views/demo/CustomPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'lab-home',
      component: CustomPage,
    },
  ],
});

export default router;

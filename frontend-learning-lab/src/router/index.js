import { createRouter, createWebHistory } from 'vue-router';
import CustomPage from '../views/demo/CustomPage.vue';
import ProcurementLayout from '../views/procurement/ProcurementLayout.vue';
import ReviewList from '../views/procurement/ReviewList.vue';
import ProcurementStatistics from '../views/procurement/ProcurementStatistics.vue';
import ReviewForm from '../views/procurement/ReviewForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'lab-home',
      component: CustomPage,
    },
    {
  path: '/procurement',
  component: ProcurementLayout,
  children: [
    { path: '', redirect: { name: 'procurement-reviews' } },
    {
  path: 'reviews',
  children: [
    { path: '', name: 'procurement-reviews', component: ReviewList },
    { path: 'new', name: 'procurement-review-new', component: ReviewForm },
  ],
},
    {
      path: 'statistics',
      name: 'procurement-statistics',
      component: ProcurementStatistics,
    },
  ],
},
  ],
});

export default router;

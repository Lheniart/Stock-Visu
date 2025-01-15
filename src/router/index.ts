import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/estimation',
      name: 'estimation',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/goal',
      name: 'goal',
      component: () => import('../views/GoalEstimationView.vue'),
    },
    {
      path: '/',
      name: 'tuto',
      component: () => import('../views/TutoView.vue'),
    },
  ],
})

export default router

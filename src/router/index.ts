import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/goal',
      name: 'goal',
      component: () => import('../views/GoalEstimationView.vue'),
    },
  ],
})

export default router

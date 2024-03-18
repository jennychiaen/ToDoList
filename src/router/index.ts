import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/totalTaskList',
    name: 'totalTaskList',
    component: () => import('../components/totalTaskList.vue'),
  },
  {
    path: '/finishedAndUnfinishedTask',
    name: 'finishedAndUnfinishedTask',
    component: () => import('../components/finishedAndUnfinishedTask.vue'),
  },
  ];
  
  
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
  export default router;
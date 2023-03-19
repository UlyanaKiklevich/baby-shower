import { createWebHistory, createRouter } from 'vue-router'
import PageAdmin from '@/src/components/pages/PageAdmin'
import PageGame from '@/src/components/pages/PageGame'
import PagePlay from '@/src/components/pages/PagePlay'

const routes = [
  {
    path: '/admin',
    name: 'PageAdmin',
    component: PageAdmin,
  },
  {
    path: '/',
    name: 'PageGame',
    component: PageGame,
  },
  {
    path: '/play',
    name: 'PagePlay',
    component: PagePlay,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

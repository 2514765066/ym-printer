import { createRouter, createWebHashHistory } from 'vue-router';
import Doc from '@/views/doc/index.vue';
import Layout from '@/layout/index.vue';
import Onboarding from '@/features/onboarding/index.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: '/onboarding',
    },
    {
      path: '/onboarding',
      component: Onboarding,
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: '/doc',
        },
        {
          path: 'doc',
          component: Doc,
        },
      ],
    },
  ],
});

export default router;

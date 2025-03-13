import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import GameMode_X01 from '@/views/GameMode_X01.vue';
import GameMode_Cricket from '@/views/GameMode_Cricket.vue';

const routes = [
  { path: '/dart-score-tracker', component: HomePage },
  { path: '/score-tracker-X01', component: GameMode_X01 },
  { path: '/score-tracker-cricket', component: GameMode_Cricket }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

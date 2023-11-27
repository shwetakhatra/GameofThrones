import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Houses from '../views/Houses.vue';
import HouseDetails from '../views/HouseDetails.vue';
import PersonDetails from '../views/PersonDetails.vue';
import Persons from '../views/Persons.vue';
import Quotes from '../views/Quotes.vue';

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: Houses,
  },
  { 
    path: '/houses', 
    component: Houses,
  },
  { 
    path: '/house/:slug', 
    name: 'house-details', 
    component: HouseDetails 
  },
  { 
    path: '/person/:slug', 
    name: 'person-details', 
    component: PersonDetails 
  },
  { 
    path: '/persons', 
    component: Persons,
  },
  { 
    path: '/quotes', 
    component: Quotes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
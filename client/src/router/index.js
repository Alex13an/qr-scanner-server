import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage';
import VolunteersScan from '../pages/VolunteersScan';
import GuestsEnterScan from '../pages/GuestsEnterScan';
import GuestsEventsEnterScan from '../pages/GuestsEventsEnterScan';
import GuestsEventsSelect from '../pages/GuestsEventsSelect';
import GuestsCounterSelect from '../pages/GuestsCounterSelect';
import CounterPage from '../pages/CounterPage';
import OtherEnterScan from '../pages/OtherEnterScan';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/scan/volunteers',
    name: 'volunteers',
    component: VolunteersScan,
  },
  {
    path: '/scan/guests/enter',
    name: 'guests',
    component: GuestsEnterScan,
  },
  {
    path: '/scan/guests/events',
    name: 'guests-events',
    component: GuestsEventsSelect,
  },
  {
    path: '/scan/guests/events/:eventId',
    name: 'event',
    component: GuestsEventsEnterScan,
  },
  {
    path: '/scan/guests/counter',
    name: 'counter',
    component: GuestsCounterSelect,
  },
  {
    path: '/scan/guests/counter/:eventId',
    name: 'counter-event',
    component: CounterPage,
  },
  {
    path: '/scan/other/enter/:otherType',
    name: 'other-enter',
    component: OtherEnterScan,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

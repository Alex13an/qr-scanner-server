import { createStore } from 'vuex';
import days from '../models/days';

export default createStore({
  state: {
    currentDay: 1,
  },
  getters: {
    getCurrentDay(state) {
      const day = Object.values(days)[state.currentDay - 1];
      return day;
    },
  },
  mutations: {
    setCurrentDay(state, day) {
      state.currentDay = day;
    },
  },
  actions: {},
  modules: {},
});

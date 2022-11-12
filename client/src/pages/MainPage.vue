<template>
  <div class="main-container">
    <DaySelector />
    <div class="main-list">
      <div class="main-list__title">{{ labels.volunteers }}</div>
      <router-link :to="{ name: tables.volunteers.name, query: { checkOut: false } }" class="main-list__item">
        {{ labels.checkIn }}
      </router-link>
      <router-link :to="{ name: tables.volunteers.name, query: { checkOut: true } }" class="main-list__item">
        {{ labels.checkOut }}
      </router-link>

      <div class="main-list__title">{{ labels.guests }}</div>
      <router-link :to="{ name: tables.guests.name }" class="main-list__item main-list__item_guests">
        {{ labels.enter }}
      </router-link>
      <router-link :to="{ name: `${tables.guests.name}-events` }" class="main-list__item main-list__item_guests">
        {{ labels.eventsEnter }}
      </router-link>
      <router-link :to="{ name: 'counter' }" class="main-list__item main-list__item_guests">Counter</router-link>
    </div>
  </div>
</template>

<script>
import tables from '../models/tables.js';
import labels from '../models/labels.js';
import DaySelector from '../components/DaySelector.vue';

export default {
  components: {
    DaySelector,
  },
  beforeCreate() {
    this.tables = tables;
    this.labels = labels;
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 2vw 10vw 0;
}

.main-list {
  color: white;
  background: white;
  padding-bottom: 50px;
  &__title {
    color: var(--blue);
    font-size: 22px;
    font-weight: bold;
    margin-top: 2vw;
  }
  &__item {
    display: block;
    background: var(--green);
    padding: 2vw;
    margin-top: 2vw;
    text-decoration: none;
    font-size: 16px;
    color: white;
    &:hover,
    &:active {
      background: var(--light-green);
    }
    &_guests {
      background: var(--blue);
      &:hover,
      &:active {
        background: var(--light-blue);
      }
    }
  }
}
</style>

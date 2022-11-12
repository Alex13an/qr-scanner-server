<template>
  <div class="day-selector">
    <button @click="toggleDay" class="button-toggler">Current Day:</button>
    <span class="current-day" :class="currentDay.id">
      {{ currentDay.label }}
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import days from '../models/days.js';

export default {
  data() {
    return {
      day: 1,
    };
  },
  computed: {
    ...mapGetters(['getCurrentDayLabel']),
    currentDay() {
      return Object.values(days)[this.day - 1];
    },
  },
  mounted() {
    this.day = this.$store.state.currentDay;
  },
  methods: {
    ...mapMutations(['setCurrentDay']),
    toggleDay() {
      const len = Object.values(days).length;
      if (this.day < len) {
        this.day += 1;
      } else {
        this.day = 1;
      }

      this.setCurrentDay(this.day);
    },
  },
  beforeCreate() {
    this.days = days;
  },
};
</script>

<style lang="scss" scoped>
.day-selector {
  color: white;
  display: flex;
}
.button-toggler {
  font-size: 16px;
  background: var(--blue);
  border: none;
  padding: 10px;
  color: white;
  outline: none;
  &:hover,
  &:active {
    background: var(--light-blue);
  }
}

.day_one {
  background: var(--blue);
}

.day_two {
  background: var(--green);
}

.day_three {
  background: var(--purple);
}

.day_four {
  background: var(--orange);
}

.current-day {
  padding: 10px;
  margin-left: 10px;
}
</style>

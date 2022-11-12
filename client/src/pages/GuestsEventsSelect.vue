<template>
  <div class="events">
    <template v-for="session in events" :key="session.label">
      <div class="events__label">{{ session.label }}</div>
      <router-link
        v-for="event in getSessionEvents(session)"
        :key="event.eventId"
        class="events__event"
        :to="{ name: 'event', params: { eventId: event.eventId } }"
      >
        <span class="events__event-id">{{ event.eventId }}</span>
        {{ event.eventName }}
      </router-link>
    </template>
  </div>
</template>

<script>
import events from '../models/events.js';
export default {
  beforeCreate() {
    this.events = events;
  },
  methods: {
    getSessionEvents(session) {
      return Object.keys(session)
        .filter((key) => key !== 'label')
        .map((key) => ({
          eventId: key,
          eventName: session[key],
        }));
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 2vw 10vw 0;
  &__label {
    font-size: 20px;
    margin: 1vw 0;
    color: var(--purple);
    font-weight: bold;
  }
  &__event {
    font-size: 14px;
    padding: 0.5vw;
    background: var(--blue);
    color: white;
    margin-bottom: 0.5vw;
    text-decoration: none;
    &:hover,
    &:active {
      background: var(--light-blue);
    }
  }
  &__event-id {
    margin-right: 0.1vw;
    text-transform: uppercase;
  }
}
</style>

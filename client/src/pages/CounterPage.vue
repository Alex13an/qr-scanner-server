<template>
  <div class="counter">
    <div class="counter__header">
      <div class="counter__head-logo">
        <img class="counter__unesco" src="../assets/images/header-logo1.png" alt="unesco" />
        <img src="../assets/images/header-logo2.png" alt="ministry" />
      </div>
    </div>
    <div class="counter__heading">World Conference on Early Childhood Care and Education</div>
    <div class="counter__title">{{ 'Parallel session ' + sessionNumber + ': ' }}{{ eventTitle }}</div>
    <div class="counter__grid reg-grid">
      <div v-if="regs > 0" class="reg-grid__reg reg-grid__block">
        <div class="reg-grid__title">AVAILABLE PLACES FOR REGISTRATION</div>
        <div class="reg-grid__count">{{ regs }}</div>
      </div>
      <div class="reg-grid__seat reg-grid__block">
        <div class="reg-grid__title">AVAILABLE PLACES</div>
        <div class="reg-grid__count">{{ seats }}</div>
      </div>
      <img class="reg-grid__qr" src="../assets/images/grid-qr.png" alt="qr" />
      <div class="reg-grid__qr-tip">
        <div class="reg-grid__qr-ubertip">SCAN QR FOR REGISTRATION</div>
      </div>
    </div>
    <div class="counter__partners">Partners:</div>
    <img class="logo-hell" src="../assets/images/logo-hell.png" alt="logos" />
    <img class="corner-boy" src="../assets/images/corner-boy.png" alt="corner boy, lives in right bottom corner" />
  </div>
</template>

<script>
import events from '../models/events.js';
import axios from 'axios';
import { apiBase } from '../models/apibase.js';

export default {
  data() {
    return {
      regs: 10,
      seats: 101,
    };
  },
  methods: {
    async getCounter() {
      const { eventId } = this.$route.params;
      const res = await axios.get(apiBase + `counter/${eventId}`);
      console.log(res.data);
    },
  },
  async mounted() {
    await this.getCounter();
  },
  computed: {
    session() {
      const { eventId } = this.$route.params;
      return 'session_' + eventId[0];
    },
    id() {
      return this.$route.params.eventId[1];
    },
    sessionNumber() {
      const index = Object.keys(events).findIndex((e) => e === this.session) + 1;
      return index;
    },
    eventTitle() {
      const session = events[this.session];
      const { eventId } = this.$route.params;
      return session[eventId];
    },
  },
};
</script>

<style lang="scss" scoped>
.counter {
  max-height: 100vh;
  height: 100vh;
  max-width: 100%;
  overflow: auto;
  position: relative;
  &__header {
    margin-top: 100px;
    margin-left: 63px;
    margin-bottom: 104px;
  }
  &__unesco {
    margin-right: 103px;
  }
  &__heading {
    background: #0079bd;
    font-weight: 300;
    color: white;
    font-size: 40px;
    line-height: 48px;
    padding-left: 67px;
    padding-top: 25px;
    padding-bottom: 15px;
    width: 1152px;
    margin-bottom: 27px;
  }
  &__title {
    color: #0079bd;
    font-size: 55px;
    font-weight: 600;
    line-height: 66px;
    margin-left: 65px;
  }
  &__grid {
    margin-left: 65px;
  }
  &__partners {
    color: #0079bd;
    font-weight: 600;
    font-size: 36px;
    margin-left: 65px;
  }
}

.reg-grid {
  display: flex;
  align-items: center;
  &__reg {
    background: #94c11f;
    margin-right: 43px;
  }
  &__seat {
    background: #f39200;
    margin-right: 20px;
  }
  &__block {
    width: 366px;
    height: 324px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  &__title {
    font-size: 40px;
    font-weight: 600;
    line-height: 48px;
    text-align: center;
  }
  &__count {
    font-size: 128px;
    line-height: 154px;
    font-weight: 600;
  }
  &__qr-tip {
    width: 260px;
    height: 324px;
    position: relative;
  }
  &__qr-ubertip {
    color: black;
    width: 260px;
    height: 100px;
    background: #ffd500;
    font-weight: 600;
    line-height: 43px;
    font-size: 36px;
    box-sizing: border-box;
    padding: 9px 14px 8px 16px;
  }
}

.corner-boy {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.logo-hell {
  margin-left: 63px;
}
</style>

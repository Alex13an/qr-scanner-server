<template>
  <div class="main-container">
    <QrScanner :qrbox="250" :fps="10" @result="onScan" />
    <div class="current-data">
      <div class="current-data__title">Event {{ eventId }}</div>
      <div v-if="errorMessage" class="current-data__qr-error">{{ labels.qrError + errorMessage }}</div>
      <div v-if="isLoading" class="current-data__loading">Loading...</div>
      <div v-if="successMessage" class="current-data__success">{{ successMessage }}</div>
      <div @click="toggleOk" v-if="isOk" class="ok-window">Ok</div>
    </div>
  </div>
</template>

<script>
import QrScanner from '../components/QrScanner.vue';
import labels from '../models/labels.js';
import tables from '../models/tables.js';
import axios from 'axios';
import QrValitadation from '../utils/QrValidation.js';
import events from '../models/events.js';
import { apiBase } from '../models/apibase.js';

export default {
  components: {
    QrScanner,
  },
  mounted() {
    this.eventId = this.$route.params.eventId;
  },
  data() {
    return {
      decoded: '',
      checkOut: false,
      errorMessage: '',
      isLoading: false,
      successMessage: '',
      eventId: '',
      isOk: false,
    };
  },
  methods: {
    toggleOk() {
      this.isOk = false;
    },

    async onScan(decodedText) {
      try {
        if (this.isLoading || this.isOk) {
          return;
        }
        this.successMessage = '';
        this.errorMessage = '';

        const qrData = QrValitadation.prepareQrData(decodedText, tables.guests.name);
        if (!qrData.id) {
          this.errorMessage = qrData;
          return;
        }

        this.isLoading = true;
        const eventId = this.$route.params.eventId;
        const eId = eventId[1];
        const session = 'session_' + eventId[0];
        const res = await axios.put(apiBase + `/${tables.guests.name}/${qrData.id}`, {
          eventId: eId,
          session,
        });
        this.isLoading = false;
        if (!res.data) {
          this.errorMessage = 'Server Response Error';
        }
        if (res.data.updated) {
          this.successMessage = res.data.message;
        } else {
          this.errorMessage = res.data.reason;
        }
        this.isOk = true;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Server Connection Error';
      }
    },
  },
  beforeCreate() {
    this.labels = labels;
    this.events = events;
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 10px 10vw 0;
}

.current-data {
  text-align: center;
  &__title {
    text-transform: uppercase;
  }
  &__qr-error {
    color: red;
  }
  &__success {
    color: green;
  }
}

.ok-window {
  background: var(--blue);
  position: absolute;
  width: 100px;
  height: 50px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover,
  &:focus {
    background: var(--light-blue);
  }
}
</style>

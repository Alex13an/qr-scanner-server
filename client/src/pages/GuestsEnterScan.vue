<template>
  <div class="main-container">
    <QrScanner :qrbox="250" :fps="10" @result="onScan" />
    <div class="current-data">
      <div class="current-data__title">{{ labels.guestsEnter }}</div>
      <div class="current-data__extra">{{ 'Day one' }}</div>
      <div v-if="errorMessage" class="current-data__qr-error">{{ labels.qrError + errorMessage }}</div>
      <div v-if="isLoading" class="current-data__loading">Loading...</div>
      <div v-if="successMessage" class="current-data__success">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import QrScanner from '../components/QrScanner.vue';
import labels from '../models/labels.js';
import tables from '../models/tables.js';
import axios from 'axios';
import QrValitadation from '../utils/QrValidation.js';
import { apiBase } from '../models/apibase.js';

export default {
  components: {
    QrScanner,
  },
  mounted() {
    // smth
  },
  data() {
    return {
      decoded: '',
      day: '',
      checkOut: false,
      errorMessage: '',
      isLoading: false,
      successMessage: '',
    };
  },
  methods: {
    async onScan(decodedText) {
      try {
        if (this.isLoading) {
          return;
        }
        this.successMessage = '';
        this.errorMessage = '';
        this.day = tables.guests.fields.day_one; // TODO day changing system

        const qrData = QrValitadation.prepareQrData(decodedText, tables.guests.name);
        if (!qrData.id) {
          this.errorMessage = qrData;
          return;
        }

        this.isLoading = true;
        const res = await axios.put(apiBase + `/${tables.guests.name}/enter/${qrData.id}`);
        this.isLoading = false;
        if (!res.data) {
          this.errorMessage = 'Server Response Error';
        }
        if (res.data.updated) {
          this.successMessage = res.data.message;
        } else {
          this.errorMessage = res.data.reason;
        }
      } catch (err) {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Server Connection Error';
      }
    },
  },
  beforeCreate() {
    this.labels = labels;
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 10vh 10vw 0;
}

.current-data {
  text-align: center;
  &__qr-error {
    color: red;
  }
  &__success {
    color: green;
  }
}
</style>

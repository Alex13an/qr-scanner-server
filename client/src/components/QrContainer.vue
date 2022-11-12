<template>
  <QrScanner :qrbox="250" :fps="10" @result="onScan" />
</template>

<script>
import QrScanner from './QrScanner.vue';
import axios from 'axios';

const API_BASE = 'https://localhost:3000';

export default {
  components: {
    QrScanner,
  },
  data() {
    return {
      decoded: '',
    };
  },
  methods: {
    async onScan(decodedText) {
      console.log(decodedText);
      try {
        const res = await axios.get(API_BASE + '/api/users', {
          params: {
            qrData: decodedText,
          },
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

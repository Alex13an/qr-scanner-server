<template>
  <div class="content">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Myriad Pro;
}

:root {
  --blue: #0077d4;
  --light-blue: rgba(0, 119, 212, 0.8);
  --green: #95c11f;
  --light-green: rgba(149, 193, 3, 0.8);
  --purple: #9f358b;
}
</style>

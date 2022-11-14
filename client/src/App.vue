<template>
  <div class="content">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@font-face {
  font-family: 'Myriad Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Myriad Pro Regular'), url('./assets/fonts/MYRIADPRO-REGULAR.woff') format('woff');
}

/* @font-face { */
/*   font-family: 'Myriad Pro'; */
/*   font-style: normal; */
/*   font-weight: light; */
/*   src: local('Myriad Pro Condensed'), url('./assets/fonts/MYRIADPRO-COND.woff') format('woff'); */
/* } */

@font-face {
  font-family: 'Myriad Pro';
  font-style: normal;
  font-weight: 300;
  src: local('Myriad Pro Light'), url('./assets/fonts/MyriadPro-Light.woff') format('woff');
}

@font-face {
  font-family: 'Myriad Pro';
  font-style: normal;
  font-weight: 600;
  src: local('Myriad Pro Semibold'), url('./assets/fonts/MYRIADPRO-SEMIBOLD.woff') format('woff');
}

/* @font-face { */
/*   font-family: 'Myriad Pro'; */
/*   font-style: normal; */
/*   font-weight: normal; */
/*   src: local('Myriad Pro Bold Condensed'), url('./assets/fonts/MYRIADPRO-BOLDCOND.woff') format('woff'); */
/* } */

@font-face {
  font-family: 'Myriad Pro';
  font-style: normal;
  font-weight: 700;
  src: local('Myriad Pro Bold'), url('./assets/fonts/MYRIADPRO-BOLD.woff') format('woff');
}
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
  --light-purple: rgba(159, 53, 139, 0.8);
  --orange: #f39200;
}
</style>

<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<style lang="less">
  @import "assets/css/common";

  html, body, #app {
    width: 100%;
    height: 100%;
  }
  [v-cloak] {
    display: none !important;
  }
</style>

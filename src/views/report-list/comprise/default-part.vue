<template>
  <div class="default-part-wrap">
    <div class="default-img"></div>
  </div>
</template>

<script>
export default {
  name: 'DefaultPart'
}
</script>

<style lang="less" scoped>
  .default-part-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(~'100vh - 212px');
    background: #ffffff;
    .default-img {
      width: 240px;
      height: 90px;
      background: url("../../../assets/img/default.png") no-repeat center center;
      background-size: cover;
    }
  }
</style>

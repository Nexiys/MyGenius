<template>
  <div class="bottom-bar-box">
    <p>京ICP备1206号 © 2020 mygenius.cne. All Rights Reserved</p>
  </div>
</template>
<script>

export default {
  name: 'BottomBar'
}
</script>
<style lang="less" scoped>
  .bottom-bar-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    font-size: 0px;
    background: #ffffff;
    text-align: center;
    p {
      line-height: 80px;
      font-size: 14px;
      color: #848894;
    }
  }
</style>

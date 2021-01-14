<template>
  <div class="lenovo-strategy-rt">
    <div class="title">记忆游戏八</div>
    <div class="lenovo-strategy-describe">
      <p class="p1">你来到了一个神秘森林，这里有许许多多的神奇动物，每个动物都有三个名字。</p>
      <p class="p1">请你尽情发挥想象力，记住它们的名字，一会它可要考你哦～</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LenovoStrategyDescribe'
}
</script>

<style lang="less" scoped>
  .lenovo-strategy-rt {
    margin-top: 20px;
    .title {
      margin-bottom: 36px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0;
      color: #006AD7;
    }
    .lenovo-strategy-describe {
      margin-bottom: 16px;
      padding: 0 10px;
      color: #007AF8;
      text-align: left;
      .p1 {
        line-height: 34px;
        font-size: 22px;
      }
    }
  }
</style>

<template>
  <div class="practice-complete-wrap">
    <div class="complete-logo"></div>
    <div class="complete-word">
      <p class="conclusion">非常好！</p>
      <p class="des">练习结束，正式游戏开始。</p>
      <p class="des">请尽可能快速准确地完成游戏～</p>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="practiceCompleteHandle">
      <span>开始答题</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'PracticeComplete',
  methods: {
    practiceCompleteHandle () {
      this.$emit('practice-complete-handle')
    }
  }
}
</script>

<style lang="less" scoped>
  .practice-complete-wrap {
    text-align: center;
    .complete-logo {
      margin: 110px auto 24px;
      width: 150px;
      height: 150px;
      background: url("../assets/img/practice-complete.png") no-repeat center center;
      background-size: cover;
    }
    .conclusion {
      margin-bottom: 30px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      color: #33363E;
    }
    .des {
      line-height: 34px;
      font-size: 22px;
      color: #565A66;
      &:last-child {
        margin-bottom: 40px;
      }
    }
  }
</style>

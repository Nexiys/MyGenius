<template>
  <!-- 练习结束 -->
  <div class="practice-complete-wrap">
    <div class="complete-logo"></div>
    <div class="complete-word">
      <p class="conclusion">非常好！</p>
      <p class="des">练习结束，接下来进入正式游戏啦～</p>
      <p class="des">请记住小动物们所对应的名字！</p>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="practiceCompleteHandle">
      <span>开始学习</span>
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    height: 480px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    .complete-logo {
      margin: 40px auto 24px;
      width: 150px;
      height: 150px;
      background: url("../../../assets/img/practice-complete.png") no-repeat center center;
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
        margin-bottom: 36px;
      }
    }
  }
</style>

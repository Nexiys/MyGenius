<template>
  <div class="answer-continue-wrap">
    <div class="continue-logo"></div>
    <div class="continue-word">
      <p class="conclusion">再接再厉！</p>
      <p class="des">恭喜你学习结束，接下来需要考你啦～</p>
      <p class="des">请点击词或符号所对应的动物图片</p>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="answerContinueHandle">
      <span>开始游戏</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'AnswerContinue',
  methods: {
    answerContinueHandle () {
      this.$emit('answer-continue-handle')
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-continue-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    height: 480px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
    text-align: center;
    .continue-logo {
      margin: 40px auto 24px;
      width: 150px;
      height: 150px;
      background: url("../../../assets/img/answer-continue.png") no-repeat center center;
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

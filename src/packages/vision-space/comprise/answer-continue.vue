<template>
  <div class="answer-continue-wrap">
    <div class="continue-logo"></div>
    <div class="continue-word">
      <p class="conclusion">再接再厉！</p>
      <p class="des">非常好，完成第二阶段练习。</p>
      <p class="des">接下来，请尽可能快速准确地完成游戏～</p>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="answerContinueHandle">
      <span>开始答题</span>
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
    text-align: center;
    .continue-logo {
      margin: 110px auto 24px;
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
        margin-bottom: 40px;
      }
    }
  }
</style>

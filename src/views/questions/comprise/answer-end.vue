<template>
  <div class="answer-end-wrap">
    <div class="end-logo"></div>
    <div class="end-word">
      <p class="end">恭喜测评完成！</p>
      <p class="des">你的测评结果已经提交，我们的专家团队正在进行专业分析，</p>
      <p class="des">通过精准专家解读，为你提供详细的个性化测评报告。</p>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="answerEndHandle">
      <span>查看报告</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'AnswerEnd',
  methods: {
    answerEndHandle () {
      this.$router.push('/report')
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-end-wrap {
    text-align: center;
    .end-logo {
      margin: 80px auto 40px;
      width: 320px;
      height: 320px;
      background: url("../../../assets/img/answer-end.png") no-repeat center center;
      background-size: cover;
    }
    .end {
      margin-bottom: 20px;
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

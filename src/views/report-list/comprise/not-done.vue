<template>
  <div class="report-not-done-wrap">
    <div class="not-done-img"></div>
    <div class="not-done-tips">
      <p>您目前还未进行测评</p>
      <p>请先进行测评</p>
    </div>
    <button
      class="tswc-button tswc-button-middle"
      @click="gotoQuestionPage">
      <span>去测评</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NotDone',
  methods: {
    gotoQuestionPage () {
      this.$router.push('/question')
    }
  }
}
</script>

<style lang="less" scoped>
  .report-not-done-wrap {
    padding-top: 130px;
    background: #ffffff;
    text-align: center;
    .not-done-img {
      margin: 0 auto 24px;
      width: 240px;
      height: 240px;
      background: url("../../../assets/img/report-not-done.png") no-repeat center center;
      background-size: cover;
    }
    .not-done-tips {
      margin-bottom: 30px;
      line-height: 22px;
      font-size: 14px;
      color: #565A66;
    }
  }
</style>

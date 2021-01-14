<template>
  <div class="report-not-build-wrap">
    <div class="not-build-img"></div>
    <div class="not-build-tips">
      <p>您的报告暂未生成</p>
      <p>敬请期待</p>
    </div>
    <button
      class="tswc-button tswc-button-middle"
      @click="backHomePage">
      <span>返回首页</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NotBuild',
  methods: {
    backHomePage () {
      this.$router.push('/question')
    }
  }
}
</script>

<style lang="less" scoped>
  .report-not-build-wrap {
    padding-top: 130px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
    .not-build-img {
      margin: 0 auto 24px;
      width: 240px;
      height: 240px;
      background: url("../../../assets/img/report-not-built.png") no-repeat center center;
      background-size: cover;
    }
    .not-build-tips {
      margin-bottom: 30px;
      line-height: 22px;
      font-size: 14px;
      color: #565A66;
    }
  }
</style>

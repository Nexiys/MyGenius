<template>
  <div class="header">
    <!-- 公司logo -->
    <div class="logo"></div>
    <!-- 题目全局控制按钮 -->
    <div class="btn-group">
        <button
          class="tswc-button tswc-button-default"
          @click="pausedClickHandle"
        >
            <i class="tswc-button-icon icon-pause"></i>
            <span>暂停</span>
        </button>
        <button
          class="tswc-button tswc-button-default"
          @click="quitClickHandle"
        >
            <i class="tswc-button-icon icon-quit"></i>
            <span>退出</span>
        </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'QuestionsHeader',
  methods: {
    // 暂停处理
    pausedClickHandle () {
      this.$emit('question-paused')
    },
    // 退出处理
    quitClickHandle () {
      this.$emit('question-quit')
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      padding: 0 40px;
      background-color: #ffffff;
    .logo {
        flex: 0 0 146px;
        width: 146px;
        height: 46px;
        background: url("../../../assets/img/tswc-logo.png") no-repeat center center;
        background-size: contain;
    }
  }
</style>

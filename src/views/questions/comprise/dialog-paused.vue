<template>
  <div class="paused-dialog-wrap">
    <div class="dialog-bg"></div>
    <div class="dialog-content">
      <header class="dialog-header">
        <i class="icon icon-popup-close" @click="continueClickHandle"></i>
      </header>
      <div class="dialog-paused-middle">
        <h3 class="dialog-title">暂停测评</h3>
        <p>测评也要劳逸结合，休息一下吧！</p>
      </div>
      <div class="btn-box">
        <button
          class="tswc-button tswc-button-primary"
          @click="continueClickHandle">
          <span>继续测评</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PausedDialog',
  methods: {
    // 继续
    continueClickHandle () {
      this.$emit('close-paused-dialog')
    }
  }
}
</script>

<style lang="less" scoped>
  .paused-dialog-wrap {
    overflow: hidden;
  }
</style>

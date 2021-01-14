<template>
  <div class="exit-dialog-wrap">
    <div class="dialog-bg"></div>
    <div class="dialog-content">
      <header class="dialog-header">
        <i class="icon icon-popup-close" @click="exitClickHandle"></i>
      </header>
      <div class="dialog-exit-middle">
        <h3 class="dialog-title">退出测评</h3>
        <p>已为您保存测评进度～</p>
        <p>请在72小时内继续测评，超时将需要重新测评！</p>
      </div>
      <div class="btn-box">
        <button
          class="tswc-button tswc-button-cancel"
          @click="exitClickHandle">
          <span>退出测评</span>
        </button>
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
  name: 'ExitDialog',
  methods: {
    // 退出
    exitClickHandle () {
      this.$emit('comfirm-exit')
    },
    // 继续
    continueClickHandle () {
      this.$emit('abandon-exit')
    }
  }
}
</script>

<template>
  <div
    class="scene-dialog-wrap"
    :style="{backgroundImage: 'url(' + dialogBg + ')'}"
    >
    <div class="content">
      <p v-html="dialogContent"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneDialog',
  props: {
    dialogContent: {
      type: String,
      default: ''
    },
    dialogBg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      interval: null
    }
  },
  mounted () {
    // 设置倒计时间隔
    const intervalTime = 1000
    // 初时间始
    let time = 3
    this.interval = setInterval(() => {
      time--
      // 时间结束
      if (time <= 0) {
        this.$emit('click-change-handle')
        clearInterval(this.interval)
      }
    }, intervalTime)
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="less" scoped>
  .scene-dialog-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    background-size: cover;
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 700px;
      height: 130px;
      line-height: 36px;
      border-radius: 8px;
      font-size: 24px;
      color: #33363E;
      background: rgba(255, 255, 255, 0.8);
      text-align: center;
    }
  }
</style>

<template>
  <div class="timing-ring-wrap">
    <svg viewBox="0, 0, 70, 70" class="timing-ring">
      <!-- 外层圆 -->
      <circle
        r="33"
        cx="35"
        cy="35"
        stroke="#e2f2fd"
        stroke-width="4"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
      />
      <!-- 内层圆 -->
      <circle
        class="progress"
        r="33"
        cx="35"
        cy="35"
        :stroke="color"
        stroke-width="4"
        stroke-linejoin="round"
        stroke-linecap="round"
        :stroke-dashoffset="dashoffset"
        :stroke-dasharray="dashArray"
        fill="none"
      >
      </circle>
    </svg>
    <div
      class="progress-text"
    >
      {{progressText}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'TimingRing',
  props: {
    originProgressText: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      startTime: 0,
      interval: null,
      radius: 33, // 可变
      color: '#47A1FE',
      dashArray: Math.PI * 66,
      dashoffset: 0,
      progressText: this.originProgressText
    }
  },
  computed: {
    isPaused () {
      return this.$store.state.isPausedFlag
    }
  },
  watch: {
    isPaused (newVal, oldVal) {
      console.log(newVal, 'isPaused')
      if (newVal) {
        this.stopSvgTime()
      } else {
        this.startSvgTime()
      }
    }
  },
  mounted () {
    this.startSvgTime()
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    // 开始倒计时
    startSvgTime () {
      // 设置倒计时间隔
      let intervalTime = 1000
      // 初时间始
      this.startTime = this.startTime ? this.startTime : this.originProgressText
      // 如果时间为小数
      if (!Number.isInteger(this.originProgressText)) {
        this.startTime = this.originProgressText * 50
        intervalTime = 20
      }
      this.interval = setInterval(() => {
        this.startTime--
        // 时间结束，切换到下一题
        if (this.startTime < 0) {
          this.$emit('time-end')
          clearInterval(this.interval)
        }
        // 还剩3秒变色
        if (Number.isInteger(this.originProgressText) && this.startTime <= 3) {
          this.color = '#dd6559'
        }

        let percent = this.startTime / this.originProgressText

        if (!Number.isInteger(this.originProgressText)) {
          this.progressText = parseFloat(this.startTime / 50).toFixed(1)
          percent = this.startTime / (this.originProgressText * 50)
        } else {
          this.progressText = this.startTime
          percent = this.startTime / this.originProgressText
        }
        // 圆的周长
        const perimeter = Math.PI * 2 * this.radius
        this.dashArray = `${perimeter * percent}px, ${perimeter}px`
      }, intervalTime)
    },
    // 停止倒计时
    stopSvgTime () {
      clearInterval(this.interval)
    }
  }
}
</script>

<style lang="less" scoped>
  .timing-ring-wrap {
    width: 70px;
    height: 70px;
    background-color: #e2f2fd;
    border-radius: 100%;
    .timing-ring {
      position: relative;
    }
    .progress {
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      transition: stroke-dasharray 1s linear;
    }
    .progress-text {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      line-height: 36px;
      font-size: 36px;
      color: #565A66;
      transform: translate(0, -50%);
      text-align: center;
    }
  }
</style>

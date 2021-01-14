<template>
  <div class="progress-bar-wrap">
    <div class="progress-bar-container">
      <div class="word left-word">低</div>
      <div class="progress-bar" ref="slider">
        <div class="bar" :style="barStyle"></div>
        <div class="bubble" v-if="firstValue" :style="bubbleStyle">
          <span class="num">{{firstValue}}</span>
        </div>
        <div
          class="progress-stop"
          v-for="(item, key) in stops"
          :key="key"
          :style="getStopStyle(item)">
        </div>
      </div>
      <div class="word right-word">高</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    firstValue: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      secondValue: null,
      max: 50,
      min: 0,
      step: 5,
      barStart: '0%'
    }
  },
  computed: {
    barStyle () {
      return {
        width: this.barSize,
        left: this.barStart
      }
    },
    bubbleStyle () {
      return {
        left: this.barSize
      }
    },
    stops () {
      const stopCount = (this.max - this.min) / this.step
      const stepWidth = 100 * this.step / (this.max - this.min)
      const result = []
      for (let i = 1; i < stopCount; i++) {
        result.push(i * stepWidth)
      }
      return result
    },
    minValue () {
      return Math.min(this.firstValue, this.secondValue)
    },
    maxValue () {
      return Math.max(this.firstValue, this.secondValue)
    },
    barSize () {
      return `${100 * (this.firstValue - this.min) / (this.max - this.min)}%`
    }
  },
  methods: {
    getStopStyle (position) {
      return { left: position + '%' }
    },
    resetSize () {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider[`client${'Width'}`]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .progress-bar-wrap {
    margin-left: 36px;
    margin-bottom: 20px;
    width: 856px;
    border: 1px solid #D8E1E8;
    .progress-bar-container {
      padding: 67px 30px 27px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .word {
      font-size: 14px;
      color: #565A66;
    }
    .left-word {
      padding-right: 24px;
    }
    .right-word {
      padding-left: 24px;
    }
    .progress-bar {
      position: relative;
      width: 700px;
      height: 12px;
      border-radius: 6px;
      background: #E9F0F8;
    }
    .bar {
      position: absolute;
      height: 12px;
      background-color: #F68D7B;
      border-radius: 6px;
    }
    .bubble {
      position: absolute;
      top: -41px;
      width: 28px;
      height: 32px;
      font-size: 14px;
      color: #FFFFFF;
      &::before {
        content: '';
        position: absolute;
        left: -16px;
        display: inline-block;
        width: 28px;
        height: 32px;
        background: url("../../../assets/img/bubble.png") no-repeat center center;
        background-size: cover;
      }
      .num {
        position: absolute;
        top: 4px;
        left: -11px;
        display: inline-block;
        width: 18px;
        text-align: center;
      }
    }
    .progress-stop {
      position: absolute;
      width: 2px;
      height: 12px;
      background-color: #fff;
    }
  }

</style>

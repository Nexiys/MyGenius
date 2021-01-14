<template>
  <div class="progress-bar-wrap">
    <div class="progress-bar-container">
      <div class="word">{{title}}</div>
      <div class="progress-bar" @click="onSliderClick" ref="slider">
        <div :class="['bar', {'bar-max': firstValue === 7} ]" :style="barStyle"></div>
        <div class="bubble" v-if="firstValue" :style="bubbleStyle">
          <span class="num">{{firstValue}}</span>
        </div>
        <div
          class="progress-stop"
          v-for="(item, key) in stops"
          :key="key"
          :style="getStopStyle(item)">
          <span class="scale">{{key + 1}}</span>
        </div>
        <span class="min">0</span>
        <span class="max">7</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      firstValue: 0,
      max: 7,
      min: 0,
      step: 1,
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
    barSize () {
      return `${100 * (this.firstValue - this.min) / (this.max - this.min)}%`
    }
  },
  methods: {
    getStopStyle (position) {
      return { left: position + '%' }
    },
    onSliderClick (event) {
      const stepWidth = this.$refs.slider.getBoundingClientRect().width / this.max
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
      const distance = event.clientX - sliderOffsetLeft
      this.firstValue = Math.ceil(distance / stepWidth)
      this.$emit('bar-answer', this.id, this.firstValue)
    }
  }
}
</script>

<style lang="less" scoped>
  .progress-bar-wrap {
    margin-bottom: 20px;
    .progress-bar-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .word {
      padding-right: 20px;
      font-size: 18px;
      color: #33363E;
    }
    .progress-bar {
      position: relative;
      width: 260px;
      height: 12px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.16);
      cursor: pointer;
    }
    .bar {
      position: absolute;
      height: 12px;
      background-color: #47A1FE;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    .bar-max {
      border-radius: 6px;
    }
    .bubble {
      position: absolute;
      top: -25px;
      width: 20px;
      height: 23px;
      font-size: 12px;
      color: #FFFFFF;
      &::before {
        content: '';
        position: absolute;
        left: -10px;
        display: inline-block;
        width: 20px;
        height: 23px;
        background: url("../../../assets/img/bubble-blue.png") no-repeat center center;
        background-size: contain;
      }
      .num {
        position: absolute;
        top: 1px;
        left: -4px;
        display: inline-block;
        width: 8px;
        text-align: center;
      }
    }
    .progress-stop {
      position: absolute;
      width: 1px;
      height: 12px;
      background-color: rgba(255, 255, 255, 0.8);
      .scale {
        position: absolute;
        top: 14px;
        left: -2px;
        line-height: 18px;
        font-size: 12px;
        color: #848894;
      }
    }
    .min, .max {
      position: absolute;
      top: 14px;
      display: inline-block;
      line-height: 18px;
      font-size: 12px;
      color: #848894;
    }
    .min {
      left: 0;
    }
    .max {
      right: 0;
    }
  }
</style>

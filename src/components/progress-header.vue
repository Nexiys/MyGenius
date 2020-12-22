<template>
  <div class="progress-header">
    <div class="progress">进度：
      <span v-if="questionStatus === 1">
        <em>0</em>
        <span>/</span>
        <span>00</span></span>
      <span v-if="questionStatus === 2">
        <em>{{curQuesIndex + 1}}</em>
        <span>/</span>
        <span>{{questionTotal}}</span>
      </span>
    </div>
    <!--<div class="title">任务二十</div>-->
    <div class="time">用时：{{changeTime}}</div>
  </div>
</template>

<script>

export default {
  name: 'ProgressHeader',
  props: {
    questionStatus: {
      type: Number,
      default: 1
    },
    curQuesIndex: {
      type: Number,
      default: 0
    },
    questionTotal: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      startTime: 0,
      interval: null
    }
  },
  computed: {
    changeTime () {
      let s, min, h
      s = parseInt(this.startTime % 60)
      min = parseInt((this.startTime % 3600) / 60)
      h = parseInt(this.startTime / 3600)
      s = s >= 10 ? s : `0${s}`
      min = min >= 10 ? min : `0${min}`
      h = h >= 10 ? h : `0${h}`
      return `${h}:${min}:${s}`
    }
  },
  created () {
    this.initTime()
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    initTime () {
      this.interval = setInterval(() => {
        this.startTime++
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .progress-header {
    display: flex;
    align-items: center;
    margin: 0 30px;
    height: 60px;
    border-bottom: 1px solid #D9D9D9;
    .title {
      flex-grow:1;
      line-height: 22px;
      font-size: 22px;
      font-weight: 500;
      color: #565A66;
      text-align: center;
    }
    .progress, .time {
      flex-grow:1;
      line-height: 16px;
      font-size: 16px;
      color: #848894;
    }
    .progress {
      text-align: left;
    }
    .time {
      text-align: right;
    }
    em {
      color: #47A1FE;
    }
  }
</style>

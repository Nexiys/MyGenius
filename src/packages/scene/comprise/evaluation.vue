<template>
  <div
    class="evaluation-wrap"
    :style="{backgroundImage: 'url(' + dialogBg + ')'}">
    <div class="tips">{{tipsContent}}</div>
    <div class="bar-box">
      <progress-bar
        class="bar"
        v-for="(data, index) in optionData"
        :key="index"
        :id="index"
        :title="data"
        @bar-answer="getBarAnswer"
      ></progress-bar>
    </div>
    <button
      :class="[
        'tswc-button',
        'tswc-button-primary',
        'order-bottom',
        { 'active': nextPageFlag }
      ]"
      @click="clickNextHandle">
      <span>下一项</span>
    </button>
  </div>
</template>

<script>
import ProgressBar from './progress-bar.vue'

export default {
  name: 'Evaluation',
  components: {
    ProgressBar
  },
  props: {
    dialogBg: {
      type: String,
      default: ''
    },
    tipsContent: {
      type: String,
      default: ''
    },
    optionData: {
      type: Array,
      default () {
        return []
      }
    },
    answerNum: {
      type: Number,
      default: 100
    },
    answerId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      answer: [],
      nextPageFlag: false
    }
  },
  methods: {
    getBarAnswer (id, value) {
      this.answer[id] = value
      if (this.answer.length === this.optionData.length) {
        this.nextPageFlag = true
      }
    },
    clickNextHandle () {
      if (this.answer.length !== this.optionData.length) {
        return
      }
      this.$emit('click-change-handle', this.answer)
      this.answer = []
    }
  }
}
</script>

<style lang="less" scoped>
  .evaluation-wrap {
    width: 100%;
    height: 100%;
    background-size: cover;
    text-align: center;
    .tips {
      width: 100%;
      height: 54px;
      line-height: 54px;
      font-size: 22px;
      color: #565A66;
      background: rgba(255, 255, 255, 0.7);
      text-align: center;
    }
    .bar-box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      flex-direction: row;
      justify-content: space-between;
      margin: 60px 30px 0;
      padding: 80px 100px;
      width: 1060px;
      height: 440px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.8);
      .bar {
        margin-bottom: 95px;
        flex: 0 0 388px;
      }
    }
    .order-bottom {
      position: absolute;
      left: 50%;
      bottom: 30px;
      margin-left: -140px;
      opacity: 0.6;
      cursor: not-allowed;
    }
    .active {
      opacity: 1;
      cursor: pointer;
    }
  }
</style>

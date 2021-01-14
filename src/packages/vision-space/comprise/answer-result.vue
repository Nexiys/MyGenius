<template>
  <div class="answer-progress-wrap">
    <div class="tips">
      <p>本题答题结果</p>
    </div>
    <div class="answer-content">
      <timing-ring
        class="countdown"
        :originProgressText="3"
        @time-end="allTimeEndHandle"
      ></timing-ring>
      <lattice-one
        v-if="nineGridsFlag"
        class="lattice-one"
        :answerList="answerList"
        :currentAnswer="currentAnswer"
      ></lattice-one>
      <lattice-two
        class="lattice-two"
        v-if="!nineGridsFlag"
        :answerList="answerList"
        :currentAnswer="currentAnswer"
      ></lattice-two>
      <div class="result">
        <span :class="['result-img', isRight ? 'right' : 'error']"></span>
        <span :class="['word', isRight ? 'right-word' : 'error-word']">{{isRight ? '回答正确！' : '回答错误！'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import LatticeOne from './lattice9-result.vue'
import LatticeTwo from './lattice25-result.vue'
import TimingRing from '@/packages/components/timing-ring.vue'

export default {
  name: 'AnswerResult',
  props: {
    nineGridsFlag: {
      type: Boolean,
      default: true
    },
    answerList: {
      type: Array,
      default () {
        return []
      }
    },
    currentAnswer: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    LatticeOne,
    LatticeTwo,
    TimingRing
  },
  computed: {
    isRight () {
      return this.answerList.toString() === this.currentAnswer.toString()
    }
  },
  methods: {
    allTimeEndHandle () {
      this.$emit('result-time-end')
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-progress-wrap {
    text-align: center;
    .tips {
      width: 100%;
      line-height: 26px;
      font-size: 22px;
      color: #565A66;
      background: rgba(255, 255, 255, 0.5);
      text-align: center;
    }
    .answer-content {
      position: relative;
      margin: 70px 30px 24px;
      width: 1120px;
      height: 498px;
      border: 2px solid #CBD6E5;
      border-radius: 8px;
      text-align: center;
      .lattice-one {
        margin: 70px auto;
      }
      .lattice-two {
        margin: 57px auto;
      }
      .countdown {
        position: absolute;
        top: -50px;
        left: 50%;
        margin-left: -50px;
        font-size: 0;
      }
    }
    .result {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      right: 70px;
      margin-top: -35px;
      .result-img {
        margin-right: 10px;
        display: inline-block;
        width: 70px;
        height: 70px;
        background-size: cover;
      }
      .right {
        background: url("../../../assets/img/right-face.png") no-repeat center center;
      }
      .error {
        background: url("../../../assets/img/error-face.png") no-repeat center center;
      }
      .word {
        font-size: 22px;
      }
      .right-word {
        color: #29C73E;
      }
      .error-word {
        color: #ED5C52;
      }
    }
  }
</style>

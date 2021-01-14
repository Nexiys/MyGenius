<template>
  <div class="answer-progress-wrap">
    <div class="tips">
      <p v-if="nineGridsFlag">按顺序点击刚才蓝色方块呈现的位置</p>
      <p v-if="!nineGridsFlag">按顺序点击箭头指向的正方形</p>
    </div>
    <div class="answer-content">
      <timing-ring
        class="countdown"
        :originProgressText="timeLimit"
        @time-end="allTimeEndHandle"
      ></timing-ring>
      <lattice-one
        class="lattice-one"
        v-if="nineGridsFlag"
        :answerList="answerList"
        @answer-complete="answerCompleteHandle"
      ></lattice-one>
      <lattice-two
        class="lattice-two"
        v-if="!nineGridsFlag"
        :answerList="answerList"
        @answer-complete="answerCompleteHandle"
      ></lattice-two>
    </div>
  </div>
</template>

<script>
import LatticeOne from './lattice9-click.vue'
import LatticeTwo from './lattice25-click.vue'
import TimingRing from '@/packages/components/timing-ring.vue'

export default {
  name: 'AnswerProgress',
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
    timeLimit: {
      type: Number,
      default: 0
    }
  },
  components: {
    LatticeOne,
    LatticeTwo,
    TimingRing
  },
  data () {
    return {
    }
  },
  methods: {
    allTimeEndHandle () {
      this.$emit('answer-time-end')
    },
    answerCompleteHandle (answer, isRight) {
      this.$emit('click-complete', answer, isRight)
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
  }

</style>

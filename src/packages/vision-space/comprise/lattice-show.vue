<template>
  <div class="answer-progress-wrap">
    <div class="tips">
      <p v-if="nineGridsFlag">记忆蓝色目标方块闪现的位置和顺序</p>
      <p v-if="!nineGridsFlag">记忆箭头指向的正方形</p>
    </div>
    <div class="answer-content">
      <lattice-one
        v-if="nineGridsFlag"
        class="lattice-one"
        :answerList="answerList"
        :contentList="contentList"
        @show-complete="showComplete"
      ></lattice-one>
      <lattice-two
        v-if="!nineGridsFlag"
        class="lattice-two"
        :answerList="answerList"
        :contentList="contentList"
        @show-complete="showComplete"
      ></lattice-two>
    </div>
  </div>
</template>

<script>
import LatticeOne from './lattice9.vue'
import LatticeTwo from './lattice25.vue'

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
    contentList: {
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
    LatticeTwo
  },
  watch: {
    answerList: {
      handler (newVal) {
        console.log(newVal, 'answerList')
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    showComplete () {
      this.$emit('memory-complete')
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-progress-wrap {
    padding-top: 30px;
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
      margin: 40px 30px 24px;
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

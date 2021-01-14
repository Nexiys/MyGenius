<template>
  <div class="vision-ques-progress-wrap">
    <essay-reading
      v-if="isGuideFlag"
      :nineGridsFlag="nineGridsFlag"
      @start-click-handle="startClickHandle"
    ></essay-reading>
    <div v-if="!isGuideFlag">
      <div
        v-for="(item, index) in questionList"
        :key="index">
        <div v-if="index === curQuesIndex">
          <lattice-show
            v-if="progressStatus===1"
            :nineGridsFlag="nineGridsFlag"
            :answerList="item.answer"
            :contentList="item.content"
            @memory-complete="memoryCompleteHandle"
          ></lattice-show>
          <answer-progress
            v-if="progressStatus===2"
            :nineGridsFlag="nineGridsFlag"
            :answerList="item.answer"
            :contentList="item.content"
            :timeLimit="item.time"
            @click-complete="clickCompleteHandle"
            @answer-time-end="clickCompleteHandle"
          ></answer-progress>
          <!-- 固定时间3s，查看结果 -->
          <answer-result
            v-if="progressStatus===3"
            :nineGridsFlag="nineGridsFlag"
            :answerList="item.answer"
            :currentAnswer="currentAnswer"
            @result-time-end="resultCompleteHandle"
          ></answer-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EssayReading from './essay-reading.vue'
import LatticeShow from './lattice-show.vue'
import AnswerProgress from './answer-progress.vue'
import AnswerResult from './answer-result.vue'

export default {
  name: 'VisionQuesProgress',
  props: {
    status: {
      type: Number,
      default: 1
    },
    nineGridsFlag: {
      type: Boolean,
      default: true
    },
    curQuesIndex: { // 当前大题题目序号
      type: Number,
      default: 0,
      required: true
    },
    questionList: {
      type: Array,
      default () {
        return []
      }
    },
    questionTotal: {
      type: Number,
      default: 0
    },
    timeLimit: {
      type: Number,
      default: 0
    }
  },
  components: {
    EssayReading,
    LatticeShow,
    AnswerProgress,
    AnswerResult
  },
  data () {
    return {
      isGuideFlag: true,
      progressStatus: 1, // 1: 记忆 2: 作答 3: 结果
      curIndex: 0, // 当前小题序号
      currentAnswer: []
    }
  },
  methods: {
    // 阅读完成
    startClickHandle () {
      this.isGuideFlag = false
      // 开始记忆
      this.progressStatus = 1
    },
    // 记忆完成
    memoryCompleteHandle () {
      // 开始做题
      this.progressStatus = 2
      // 记录开始时间
      this.getStartTime()
    },
    // 做题完成
    clickCompleteHandle (answer, result) {
      this.currentAnswer = answer
      // 记录结束时间
      this.getEndTime(result)
      if (this.status === 1) {
        // 查看结果
        this.progressStatus = 3
      } else {
        this.resultCompleteHandle()
      }
    },
    // 查看结果完成
    resultCompleteHandle () {
      // 进入下一题
      this.$emit('current-index-change')
      // 状态重置到记忆阶段
      this.progressStatus = 1
      // 此组题目完成
      if ((this.curQuesIndex + 1) === this.questionTotal) {
        this.$emit('answer-complete-handle')
        this.isGuideFlag = true
      }
    },
    allTimeEndHandle () {
      this.getEndTime(0)
      this.$emit('all-time-end')
    },
    getStartTime () {
      const total = this.questionList.length
      if (this.curQuesIndex > total) return

      const startTime = new Date().getTime()
      const answerData = {
        startTime: startTime
      }
      this.$emit('save-answer-data', answerData, 'start')
    },
    getEndTime (result) {
      const isRight = result ? 1 : 0
      const endTime = new Date().getTime()
      const answerData = {
        answer: isRight,
        endTime: endTime
      }
      this.$emit('save-answer-data', answerData, 'end')
    }
  }
}
</script>

<style lang="less" scoped>
  .vision-ques-progress-wrap {
  }
</style>

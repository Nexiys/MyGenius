<template>
  <div class="ques-progress-wrap">
    <practice-guide
      v-if="questionStatus === 1 && progressStatus === 1"
      :contentList="contentList"
      @practice-guide-handle="statusHandle"
    ></practice-guide>
    <learning-guide
      v-if="questionStatus === 2 && progressStatus === 1"
      :contentList="contentList"
      :time="time"
      @learning-guide-handle="statusHandle"
    ></learning-guide>
    <answer-continue
      v-if="progressStatus === 3"
      @answer-continue-handle="answerContinueHandle"
    ></answer-continue>
    <div v-if="progressStatus === 2">
      <div
        v-for="(item, index) in questionList"
        :key="index"
      >
        <answer-progress
          v-if="index === curQuesIndex"
          :questionData="item"
          @next-ques="nextQuesHandle"
        ></answer-progress>
      </div>
    </div>
  </div>
</template>

<script>
import PracticeGuide from './practice-guide.vue'
import LearningGuide from './learning-guide.vue'
import AnswerContinue from './answer-continue.vue'
import AnswerProgress from './answer-progress.vue'

export default {
  name: 'LenovoQuesProgress',
  props: {
    questionStatus: {
      type: Number,
      required: true,
      default: 1
    },
    contentList: {
      type: Array,
      default () {
        return []
      }
    },
    questionList: {
      type: Array,
      default () {
        return []
      }
    },
    time: {
      type: Number,
      required: true,
      default: 0
    }
  },
  components: {
    PracticeGuide,
    LearningGuide,
    AnswerContinue,
    AnswerProgress
  },
  data () {
    return {
      curQuesIndex: 0, // 当前题目序号
      progressStatus: 1 // 1:引导，2:作题，3:继续做题提示页
    }
  },
  methods: {
    nextQuesHandle (isRightFlag) {
      const total = this.questionList.length

      this.getEndTime(isRightFlag)
      this.curQuesIndex += 1
      if ((this.curQuesIndex + 1) <= total) {
        this.getStartTime()
      }
      // 作答完成
      if (this.curQuesIndex === total) {
        this.$emit('answer-complete-handle')
      }
    },
    statusHandle () {
      // 练习阶段，
      if (this.questionStatus === 1) {
        this.progressStatus = 2
      } else {
        this.progressStatus = 3
      }
    },
    answerContinueHandle () {
      this.progressStatus = 2
      // 记录开始时间
      this.getStartTime()
    },
    getStartTime () {
      const total = this.questionList.length
      if (this.curQuesIndex > total) return

      const startTime = new Date().getTime()
      const answerData = {
        startTime: startTime
      }
      this.$emit('save-answer-data', (this.curQuesIndex + 1), answerData, 'start')
    },
    getEndTime (isRightFlag) {
      const isRight = isRightFlag ? 1 : 0
      const endTime = new Date().getTime()
      const answerData = {
        answer: isRight,
        endTime: endTime
      }
      this.$emit('save-answer-data', (this.curQuesIndex + 1), answerData, 'end')
    }
  }
}
</script>

<style lang="less" scoped>
  .ques-progress-wrap {
    width: 100%;
    height: 100%;
    text-align: center;
  }

</style>

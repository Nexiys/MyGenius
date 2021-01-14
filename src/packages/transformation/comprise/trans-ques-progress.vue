<template>
  <div class="ques-progress-wrap">
    <div
      v-for="(item, index) in questionList"
      :key="index">
      <div v-if="index === curQuesIndex">
        <learning-guide
          v-if="isGuideFlag"
          :status="item.list_name"
          :interval="item.interval"
          @time-end-handle="learningCompleteHandle"
        ></learning-guide>
        <div
          class="square-content"
          v-for="(item1, index1) in item.content"
          :key="index1">
          <judgment-square
            v-if="!isGuideFlag && index1 === curIndex"
            :questionData = "item1"
          ></judgment-square>
        </div>
        <timing-ring
          v-if="!isGuideFlag"
          class="countdown"
          :originProgressText="item.time_limit"
          @time-end="allTimeEndHandle"
        ></timing-ring>
      </div>
    </div>
  </div>
</template>

<script>
import LearningGuide from './learning-guide.vue'
import JudgmentSquare from './judgment-square.vue'
import TimingRing from '@/packages/components/timing-ring.vue'

export default {
  name: 'TransformationQuesProgress',
  props: {
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
    LearningGuide,
    JudgmentSquare,
    TimingRing
  },
  data () {
    return {
      curIndex: 0, // 当前小题序号
      isGuideFlag: true
    }
  },
  methods: {
    // 阅读完成
    learningCompleteHandle () {
      this.isGuideFlag = false
      this.$emit('show-time', 'start')
      // 记录开始时间
      this.getStartTime()
    },
    keyHandle (code) {
      // 阅读引导时，不能切题
      if (this.isGuideFlag) return
      // 当前大题的总小题数
      const total = this.questionList[this.curQuesIndex].content.length
      this.getEndTime(code)
      this.curIndex += 1
      if ((this.curIndex + 1) <= total) {
        this.getStartTime()
      }

      if (this.curIndex === total) {
        this.$emit('hide-time')
        // 切换到下一道大题
        this.$emit('current-index-change')
        // 重置小题初始值
        this.curIndex = 0
        // 展示下一道题目的引导文案
        this.isGuideFlag = true
        // 此组题目完成
        if ((this.curQuesIndex + 1) === this.questionTotal) {
          this.$emit('answer-complete-handle')
        }
      }
    },
    allTimeEndHandle () {
      this.getEndTime(0)
      this.$emit('all-time-end')
    },
    getStartTime () {
      const total = this.questionList[this.curQuesIndex].content.length
      if (this.curIndex > total) return

      const startTime = new Date().getTime()
      const answerData = {
        startTime: startTime
      }
      this.$emit('save-answer-data', (this.curIndex + 1), answerData, 'start')
    },
    getEndTime (code) {
      const list = this.questionList[this.curQuesIndex].content
      const curQuesAns = list[this.curIndex].keycode
      const isRight = Number(curQuesAns) === Number(code) ? 1 : 0
      const endTime = new Date().getTime()
      const answerData = {
        answer: isRight,
        endTime: endTime
      }
      this.$emit('save-answer-data', (this.curIndex + 1), answerData, 'end')
    }
  }
}
</script>

<style lang="less" scoped>
  .ques-progress-wrap {
    .square-content {
      position: relative;
    }
    .countdown {
      position: relative;
      top: -548px;
      left: 50%;
      margin-left: -50px;
      font-size: 0;
      z-index: 2;
    }
  }
</style>

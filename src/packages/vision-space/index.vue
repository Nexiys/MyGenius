<template>
  <div class="vision-space-wrap">
    <!-- 进度、名称、时间 -->
    <progress-header
      :curQuesIndex="curQuesIndex"
      :questionStatus="questionStatus"
      :questionTotal="questionTotal"
    ></progress-header>
    <!-- 练习阶段 or 正式阶段 -->
    <question-status
      v-if="!practiceCompleteFlag"
      :questionStatus="questionStatus"
    ></question-status>
    <!-- 题目 -->
    <vision-ques-progress
      ref="visionSpace"
      v-if="!practiceCompleteFlag"
      :status="questionStatus"
      :nineGridsFlag="nineGridsFlag"
      :curQuesIndex="curQuesIndex"
      :questionList="questionList"
      :questionTotal="questionTotal"
      @current-index-change="curIndexChange"
      @answer-complete-handle="answerCompleteHandle"
      @save-answer-data="answerDataHandle"
    ></vision-ques-progress>
    <!-- 九格练习完成 -->
    <practice-complete
      v-if="nineGridsFlag&&practiceCompleteFlag"
      @practice-complete-handle="practiceCompleteHandle"
    ></practice-complete>
    <!-- 25格练习完成 -->
    <answer-continue
      v-if="!nineGridsFlag&&practiceCompleteFlag"
      @answer-continue-handle="practiceCompleteHandle"
    ></answer-continue>
  </div>
</template>

<script>
import Service from '@/api'
import ProgressHeader from '@/packages/components/progress-header.vue'
import QuestionStatus from '@/packages/components/question-status.vue'
import VisionQuesProgress from './comprise/vision-ques-progress.vue'
import PracticeComplete from '@/packages/components/practice-complete.vue'
import AnswerContinue from './comprise/answer-continue.vue'

export default {
  name: 'VisionSpace',
  data () {
    return {
      questionStatus: 1, // 1: 练习，2: 正式
      nineGridsFlag: true,
      questionList: [], // 题目数组
      nineGridsList: [], // 九格数据list
      nineGridsTotal: 0,
      moreGridsList: [], // 25格数据list
      moreGridsTotal: 0,
      questionTotal: 0, // 当前题目数量
      curQuesIndex: 0, // 当前题目序号
      answerData: [],
      practiceCompleteFlag: false
    }
  },
  components: {
    ProgressHeader,
    QuestionStatus,
    VisionQuesProgress,
    PracticeComplete,
    AnswerContinue
  },
  created () {
    // 初始化题目信息
    this.initQuestionData()
  },
  methods: {
    // 获取视觉空间数据
    initQuestionData () {
      Service.vision_space({
        type: this.questionStatus
      }).then(data => {
        this.nineGridsList = data.grid_9
        this.moreGridsList = data.grid_25
        this.nineGridsTotal = data.grid_9.length
        this.moreGridsTotal = data.grid_25.length
        if (this.nineGridsFlag) {
          // 九格数据
          this.questionList = this.nineGridsList
          this.questionTotal = this.nineGridsTotal
        } else {
          // 25格数据
          this.questionList = this.moreGridsList
          this.questionTotal = this.moreGridsTotal
        }
        this.initAnswerData()
      })
    },
    // 初始化答题数据
    initAnswerData () {
      if (this.questionStatus === 1) return
      if (this.questionStatus === 2 && !this.nineGridsFlag) return
      // 正式答题，创建答题数据
      if (this.questionStatus === 2) {
        const list1 = []
        const list2 = []
        this.nineGridsList.forEach((value1, index1) => {
          const newValue1 = {
            question_num: index1 + 1,
            answer: 0,
            react: 0,
            startTime: 0,
            endTime: 0
          }
          list1.push(newValue1)
        })
        this.answerData.push(list1)
        this.moreGridsList.forEach((value2, index2) => {
          const newValue2 = {
            question_num: index2 + 1,
            answer: 0,
            react: 0,
            startTime: 0,
            endTime: 0
          }
          list2.push(newValue2)
        })
        this.answerData.push(list2)
      }
    },
    // 提交作答数据
    submitAnswerData () {
      Service.vision_space_submit({
        data: this.answerData
      }).then(data => {
        if (data.code === 200) {
          this.$emit('enter-next-question')
        }
      })
    },
    // 作答数据处理
    answerDataHandle (data, stage) {
      // 练习阶段不需要作答数据
      if (this.questionStatus === 1) return
      // 因为进入每道题目的动作不同，所以记录时间及答案逻辑会比较复杂
      if (this.nineGridsFlag) {
        this.answerData[0].forEach((value1, index1) => {
          if (value1.question_num === (this.curQuesIndex + 1)) {
            this.answerData[0][index1] = { ...this.answerData[0][index1], ...data }
            if (stage === 'end') {
              const start = this.answerData[0][index1].startTime
              const end = this.answerData[0][index1].endTime
              this.answerData[0][index1].react = ((end - start) / 1000).toFixed(2)
            }
          }
        })
      } else {
        this.answerData[1].forEach((value, index) => {
          if (value.question_num === (this.curQuesIndex + 1)) {
            this.answerData[1][index] = { ...this.answerData[1][index], ...data }
            if (stage === 'end') {
              const start = this.answerData[1][index].startTime
              const end = this.answerData[1][index].endTime
              this.answerData[1][index].react = ((end - start) / 1000).toFixed(2)
            }
          }
        })
      }
    },
    answerCompleteHandle () {
      if (this.questionStatus === 1) {
        // 练习阶段完成
        this.practiceCompleteFlag = true
        this.curQuesIndex = 0
      } else {
        if (this.nineGridsFlag) {
          // 九格题目完成，进入25格题目
          this.questionStatus = 1
          this.nineGridsFlag = false
          this.initQuestionData()
          this.practiceCompleteFlag = false
          this.curQuesIndex = 0
        } else {
          // 切换下一阶段，进入下一个题目
          this.submitAnswerData()
        }
      }
    },
    practiceCompleteHandle () {
      // 练习阶段完成
      this.questionStatus = 2
      this.initQuestionData()
      this.practiceCompleteFlag = false
    },
    curIndexChange () {
      this.curQuesIndex += 1
    }
  }
}
</script>

<style lang="less" scoped>
  .vision-space-wrap {
    text-align: center;
  }
</style>

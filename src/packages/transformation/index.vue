<template>
  <div class="transformation-wrap">
    <!-- 进度、名称、时间 -->
    <progress-header
      :curQuesIndex="curQuesIndex"
      :questionStatus="questionStatus"
      :questionTotal="questionTotal"
    ></progress-header>
    <!-- 练习阶段 or 正式阶段 -->
    <question-status
      v-if="!practiceCompleteFlag && learningStatus === 'complete'"
      :questionStatus="questionStatus"
    ></question-status>
    <learning-stage-red
      v-if="learningStatus === 'red'"
      @learning-stage-handle="learningStageHandle('red')"
    ></learning-stage-red>
    <learning-stage-blue
      v-if="learningStatus === 'blue'"
      @learning-stage-handle="learningStageHandle('blue')"
    ></learning-stage-blue>
    <!-- 题目 -->
    <ques-progress
      ref="transformation"
      v-if="!practiceCompleteFlag && learningStatus === 'complete'"
      :questionStatus="questionStatus"
      :curQuesIndex="curQuesIndex"
      :questionList="questionList"
      :questionTotal="questionTotal"
      :timeLimit="timeLimit"
      @current-index-change="curIndexChange"
      @answer-complete-handle="answerCompleteHandle"
      @save-answer-data="answerDataHandle"
      @all-time-end="submitAnswerData"
    ></ques-progress>
    <!-- 练习完成 -->
    <practice-complete
      v-if="practiceCompleteFlag"
      @practice-complete-handle="practiceCompleteHandle"
    ></practice-complete>
  </div>
</template>

<script>
import Service from '@/api'
import ProgressHeader from '@/packages/components/progress-header.vue'
import QuestionStatus from '@/packages/components/question-status.vue'
import LearningStageRed from './comprise/learning-stage-red.vue'
import LearningStageBlue from './comprise/learning-stage-blue.vue'
import QuesProgress from './comprise/trans-ques-progress.vue'
import PracticeComplete from '@/packages/components/practice-complete.vue'

export default {
  name: 'Transformation',
  data () {
    return {
      learningStatus: 'red', // red: 红色，blue: 蓝色，complete: 完成
      questionStatus: 1, // 1: 练习，2: 正式
      curQuesIndex: 0,
      questionList: [], // 题目数组
      questionTotal: 0, // 题目总数
      timeLimit: 0, // 总时间限制
      practiceCompleteFlag: false,
      answerData: [],
      isShowTime: false
    }
  },
  components: {
    ProgressHeader,
    QuestionStatus,
    LearningStageRed,
    LearningStageBlue,
    QuesProgress,
    PracticeComplete
  },
  created () {
    // 初始化题目信息
    this.initQuestionData()
  },
  mounted () {
    window.addEventListener('keydown', this.handleKeyup, false)
  },
  destroyed () {
    window.removeEventListener('keydown', this.handleKeyup, false)
  },
  methods: {
    // 获取转换数据
    initQuestionData () {
      Service.transformation({
        type: this.questionStatus
      }).then(data => {
        this.questionList = data.content
        this.questionTotal = data.content.length
        // 整体时间限制
        this.timeLimit = data.time_limit
        // 正式答题，创建答题数据
        if (this.questionStatus === 2) {
          this.questionList.forEach((list, index1) => {
            const newList = list.content
            newList.forEach((value, index2) => {
              const newValue = {
                number1: index1 + 1,
                number2: index2 + 1,
                question_num: this.answerData.length + 1,
                answer: 0,
                type: value.type,
                react: 0,
                startTime: 0,
                endTime: 0
              }
              this.answerData.push(newValue)
            })
          })
        }
      })
    },
    // 提交作答数据
    submitAnswerData () {
      if (this.questionStatus === 1) {
        this.practiceCompleteFlag = true
        this.curQuesIndex = 0
      } else {
        Service.transformation_submit({
          data: this.answerData
        }).then(data => {
          if (data.code === 200) {
            this.$emit('enter-next-question')
          }
        })
      }
    },
    // 作答数据处理
    answerDataHandle (number, data, stage) {
      // 练习阶段不需要作答数据
      if (this.questionStatus === 1) return
      // 因为进入每道题目的动作不同，所以记录时间及答案逻辑会比较复杂
      this.answerData.forEach((value, index) => {
        if (value.number1 === (this.curQuesIndex + 1) && value.number2 === number) {
          this.answerData[index] = { ...this.answerData[index], ...data }
          if (stage === 'end') {
            const start = this.answerData[index].startTime
            const end = this.answerData[index].endTime
            this.answerData[index].react = ((end - start) / 1000).toFixed(2)
          }
        }
      })
    },
    // 键盘处理
    handleKeyup (event) {
      const e = event || window.event
      if (!e) return
      if (this.learningStatus !== 'complete') return
      if (this.practiceCompleteFlag) return
      const { keyCode } = e
      if (keyCode && (keyCode === 37 || keyCode === 39)) {
        // 输入处理
        this.$refs.transformation.keyHandle(keyCode)
      }
    },
    answerCompleteHandle () {
      if (this.questionStatus === 1) {
        // 练习阶段完成
        this.practiceCompleteFlag = true
        this.curQuesIndex = 0
      } else {
        // 切换下一阶段, 进入下一个题目
        this.submitAnswerData()
      }
    },
    // 练习完成，进入正式答题阶段
    practiceCompleteHandle () {
      this.questionStatus = 2
      this.initQuestionData()
      this.practiceCompleteFlag = false
      this.isShowTime = false
    },
    curIndexChange () {
      this.curQuesIndex += 1
    },
    // 学习阶段
    learningStageHandle (word) {
      if (word === 'red') {
        this.learningStatus = 'blue'
      } else {
        this.learningStatus = 'complete'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .transformation-wrap {
    text-align: center;
    .countdown {
      position: relative;
      top: -548px;
      left: 50%;
      margin-left: -50px;
      font-size: 0;
    }
  }
</style>

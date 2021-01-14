<template>
  <div class="lenovo-strategy-wrap">
    <div class="lenovo-strategy-content-wrap">
      <learning-rules
        v-if="progressStatus === 1"
        @rule-complete="ruleCompleteHandle"
      ></learning-rules>
      <!-- 题目 -->
      <ques-progress
        ref="LenovoStrategy"
        v-if="progressStatus === 2"
        :questionStatus="questionStatus"
        :contentList="questionData.content"
        :questionList="questionData.question"
        :time="questionData.remember_time"
        @answer-complete-handle="answerCompleteHandle"
        @save-answer-data="answerDataHandle"
      ></ques-progress>
      <!-- 练习完成 -->
      <practice-complete
        v-if="progressStatus === 3"
        @practice-complete-handle="practiceCompleteHandle"
      ></practice-complete>
    </div>
  </div>
</template>

<script>
import Service from '@/api'
import LearningRules from './comprise/learning-rules.vue'
import QuesProgress from './comprise/lenovo-ques-progress.vue'
import PracticeComplete from './comprise/practice-complete.vue'

export default {
  name: 'LenovoStrategy',
  data () {
    return {
      progressStatus: 1, // 进度状态
      questionStatus: 1, // 1: 练习，2: 正式
      questionData: {
        content: [],
        question: [],
        remember_time: 0
      },
      questionList: [], // 题目数组
      answerData: [] // 作答数据
    }
  },
  components: {
    LearningRules,
    QuesProgress,
    PracticeComplete
  },
  created () {
    // 初始化题目信息
    this.initQuestionData()
  },
  methods: {
    // 获取转换数据
    initQuestionData () {
      Service.lenovo_strategy({
        type: this.questionStatus
      }).then(data => {
        // 对象，content、question、time
        this.questionData = data
        // 正式答题，创建答题数据
        if (this.questionStatus === 2) {
          const questionList = this.questionData.question
          questionList.forEach((value, index1) => {
            const newValue = {
              question_num: this.answerData.length + 1,
              answer: 0,
              score: value.score,
              react: 0,
              startTime: 0,
              endTime: 0
            }
            this.answerData.push(newValue)
          })
        }
      })
    },
    // 作答数据处理
    answerDataHandle (num, data, stage) {
      // 练习阶段不需要作答数据
      if (this.questionStatus === 1) return
      // 因为进入每道题目的动作不同，所以记录时间及答案逻辑会比较复杂
      this.answerData.forEach((value, index) => {
        if (value.question_num === num) {
          this.answerData[index] = { ...this.answerData[index], ...data }
          if (stage === 'end') {
            const start = this.answerData[index].startTime
            const end = this.answerData[index].endTime
            this.answerData[index].react = ((end - start) / 1000).toFixed(2)
          }
        }
      })
    },
    // 提交作答数据
    submitAnswerData () {
      Service.lenovo_strategy_submit({
        data: this.answerData
      }).then(data => {
        if (data.code === 200) {
          this.$emit('enter-next-question')
        }
      })
    },
    answerCompleteHandle () {
      if (this.questionStatus === 1) {
        // 练习阶段完成
        this.progressStatus = 3
      } else {
        // 切换下一阶段,提交作答数据
        this.submitAnswerData()
      }
    },
    ruleCompleteHandle () {
      this.progressStatus = 2
    },
    // 练习完成，进入正式答题阶段
    practiceCompleteHandle () {
      this.questionStatus = 2
      this.initQuestionData()
      this.progressStatus = 2
    },
    clickHandle () {
      this.questionStatus = 1
    }
  }
}
</script>

<style lang="less" scoped>
  .lenovo-strategy-wrap {
    padding: 30px;
    font-size: 0;
    .lenovo-strategy-content-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      background: url("../../assets/img/lenovo-strategy-bg.png") no-repeat center center;
      background-size: cover;
      text-align: center;
      .complete-box {

      }
    }
  }
</style>

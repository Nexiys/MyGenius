<template>
  <div class="voice-ring-wrap">
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
    <ques-progress
      ref="voiceRing"
      v-if="!practiceCompleteFlag"
      :curQuesIndex="curQuesIndex"
      :questionList="questionList"
      :questionTotal="questionTotal"
      @current-index-change="curIndexChange"
      @answer-complete-handle="answerCompleteHandle"
      @save-answer-data="answerDataHandle"
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
import QuesProgress from './comprise/voice-ques-progress.vue'
import PracticeComplete from '@/packages/components/practice-complete.vue'

export default {
  name: 'VoiceRing',
  data () {
    return {
      questionStatus: 1, // 1: 练习，2: 正式
      questionList: [], // 题目数组
      questionTotal: 0, // 题目总数
      curQuesIndex: 0, // 当前题目序号
      practiceCompleteFlag: false,
      answerData: [] // 作答数据
    }
  },
  components: {
    ProgressHeader,
    QuestionStatus,
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
    // 获取语音环数据
    initQuestionData () {
      Service.voice_ring({
        type: this.questionStatus
      }).then(data => {
        this.questionList = data
        this.questionTotal = data.length
        // 正式答题，创建答题数据
        if (this.questionStatus === 2) {
          this.questionList.forEach((value, index) => {
            const newValue = [{
              question_num: index + 1,
              answer: 0,
              type: 'words_judge',
              react: 0,
              startTime: 0,
              endTime: 0
            }, {
              question_num: index + 1,
              answer: 0,
              type: 'semantics_judge',
              react: 0,
              startTime: 0,
              endTime: 0
            }]
            this.answerData.push.apply(this.answerData, newValue)
          })
        }
      })
    },
    // 作答数据处理
    answerDataHandle (type, data, stage) {
      // 练习阶段不需要作答数据
      if (this.questionStatus === 1) return
      // 因为进入每道题目的动作不同，所以记录时间及答案逻辑会比较复杂
      this.answerData.forEach((value, index) => {
        if (value.question_num === (this.curQuesIndex + 1) && value.type === type) {
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
      Service.voice_ring_submit({
        data: this.answerData
      }).then(data => {
        if (data.code === 200) {
          this.$emit('enter-next-question')
        }
      })
    },
    // 键盘处理
    handleKeyup (event) {
      const e = event || window.event
      if (!e) return
      if (this.practiceCompleteFlag) return
      const { keyCode } = e
      if (keyCode && (keyCode === 70 || keyCode === 74)) {
        // 输入处理
        this.$refs.voiceRing.keyHandle(keyCode)
      }
    },
    // 一个答题阶段完成处理逻辑
    answerCompleteHandle () {
      if (this.questionStatus === 1) {
        // 练习阶段完成
        this.practiceCompleteFlag = true
        this.curQuesIndex = 0
      } else {
        // 切换下一阶段，进入下一个题目
        this.submitAnswerData()
      }
    },
    // 练习完成，进入正式答题阶段
    practiceCompleteHandle () {
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
  .voice-ring-wrap {
    text-align: center;
  }
</style>

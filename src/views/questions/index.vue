<template>
  <div class="questions">
    <!-- 题目顶部：logo、暂停、退出 -->
    <question-header
      @question-paused="questionPausedHandle"
      @question-quit="questionQuitHandle"
    ></question-header>
    <!-- 题目主体 -->
    <div class="question-card-wrap">
      <!-- 介绍页 -->
      <introduced-card
        ref="introduced"
        v-if="questionStatus === 0"
        :type="currentType"
        class="question-card"
        @introduced-complet="introducedCompletHandle"
      ></introduced-card>
      <!-- 题型 -->
      <question-card
        ref="questionCard"
        class="question-card"
        v-if="questionStatus === 1"
        :type="currentType"
        @enter-next-question="enterNextQuestionHandle"
      ></question-card>
      <!-- 结束 -->
      <answer-end
        class="question-card"
        v-if="questionStatus === 2"
      ></answer-end>
    </div>
    <!-- 暂停弹窗 -->
    <dialog-paused
      v-if="pausedFlag"
      @close-paused-dialog="closePausedDialogHandle"
    ></dialog-paused>
    <!-- 退出弹窗 -->
    <dialog-exit
      v-if="exitFlag"
      @comfirm-exit="comfirmExitHandle"
      @abandon-exit="abandonExitHandle"
    ></dialog-exit>
  </div>
</template>

<script>
import Service from '@/api'
import QuestionHeader from './comprise/header.vue'
import IntroducedCard from './comprise/introduced-card.vue'
import QuestionCard from './comprise/question-card.vue'
import AnswerEnd from './comprise/answer-end.vue'
import DialogPaused from './comprise/dialog-paused.vue'
import DialogExit from './comprise/dialog-exit.vue'

export default {
  name: 'Questions',
  data () {
    return {
      num: this.$route.query.num || 0,
      routeName: this.$route.query.routeName || '',
      caseFlag: this.$route.query.case || '1',
      startTime: 0,
      interval: null,
      pausedFlag: false, // 暂停
      exitFlag: false, // 退出
      questionStatus: 0, // 题目状态 0:介绍页 1:题目 2:结束页
      currentType: 18, // 当前题目类型
      introContent: '', // 题目介绍页内容
      questionTypeMap: { // 题型映射
        13: 'LenovoStrategy',
        18: 'Transformation',
        20: 'VisionSpace',
        21: 'VoiceRing',
        22: 'Scene'
      },
      currentIndex: 0, // 当前进度
      order: [18, 21, 20] // 题目顺序
    }
  },
  components: {
    QuestionHeader,
    IntroducedCard,
    QuestionCard,
    AnswerEnd,
    DialogPaused,
    DialogExit
  },
  created () {
    this.compatibleHandle()
    if (window.localStorage.getItem('questionTime')) {
      this.startTime = parseInt(window.localStorage.getItem('questionTime'))
    }
    this.timeStart()
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    // 跳转兼容逻辑
    compatibleHandle () {
      if (this.num) {
        this.order = this.num.split(';')
        this.currentType = Number(this.order[this.currentIndex])
      } else {
        if (this.caseFlag === '1') {
          // case1转换 语音环 视觉空间模板
          this.currentType = 18
        } else if (this.caseFlag === '2') {
          // case2联想策略
          this.currentType = 13
        } else {
          // case3 场景
          this.currentType = 22
        }
      }
    },
    // 开始计时
    timeStart () {
      this.interval = setInterval(this.timeHandle, 1000)
    },
    // 停止计时
    timeStop () {
      clearInterval(this.interval)
      window.localStorage.removeItem('questionTime')
    },
    // 时间处理
    timeHandle () {
      this.startTime += 1
      window.localStorage.setItem('questionTime', this.startTime)
    },
    // 初始化介绍页信息
    initIntroData () {
      Service.introduction({
        num: this.currentType
      }).then(data => {
        this.introContent = data.intro
      })
    },
    // 介绍页完成
    introducedCompletHandle () {
      this.questionStatus = 1
    },
    // 进入下一个题目处理操作
    enterNextQuestionHandle () {
      // this.questionStatus = 0
      // this.currentIndex += 1
      // if (this.currentIndex >= this.order.length) {
      //   this.questionStatus = 2
      // }
      if (this.routeName) {
        this.questionStatus = 0
        this.currentIndex += 1
        this.currentType = Number(this.order[this.currentIndex])
        console.log(this.currentIndex, 'this.currentIndex')
        if (this.currentIndex >= this.order.length) {
          if (this.currentType === 22) {
            this.questionStatus = 2
          } else {
            this.$router.push({ name: this.routeName })
          }
        }
      } else {
        if (this.caseFlag === '1') {
          if (this.currentIndex >= this.order.length) {
            // 记忆复述策略
            this.$router.push('/msintroduce')
          }
          this.questionStatus = 0
          this.currentIndex += 1
          // case1转换 语音环 视觉空间模板
          this.currentType = this.order[this.currentIndex]
        } else if (this.caseFlag === '2') {
          // case2联想策略
          this.$router.push('/one')
        } else {
          // case3 场景题
          this.questionStatus = 2
        }
      }
    },
    // 答题阶段暂停处理
    questionPausedHandle () {
      // 整体时间暂停
      this.wholeTimeStop()
      // 暂停弹窗出现
      this.pausedFlag = true
    },
    // 答题阶段退出处理
    questionQuitHandle () {
      // 整体时间暂停
      this.wholeTimeStop()
      this.exitFlag = true
    },
    // 关闭暂停弹窗
    closePausedDialogHandle () {
      // 整体时间开始
      this.wholeTimeStart()
      this.pausedFlag = false
    },
    // 确认退出
    comfirmExitHandle () {
      this.exitFlag = false
      // 跳转到首页
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    },
    // 取消退出
    abandonExitHandle () {
      // 整体时间开始
      this.wholeTimeStart()
      this.exitFlag = false
    },
    // 全部时间停止
    wholeTimeStop () {
      // 倒计时暂停
      this.timeStop()
      this.$store.commit('wholeTimeStop')
    },
    // 全部时间开始
    wholeTimeStart () {
      // 倒计时开始
      this.timeStart()
      this.$store.commit('wholeTimeStart')
    }
  }
}
</script>

<style lang="less" scoped>
  .questions {
    width: 100%;
    height: 100%;
    .question-card-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: calc(~'100% - 70px');
      background: url("../../assets/img/evaluation-bg.png") no-repeat center center;
      background-size: cover;
      .question-card {
        margin: 0 auto;
        width: 1180px;
        height: 760px;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 20px 40px -10px rgba(33,120,215,0.40);
      }
    }
  }
</style>

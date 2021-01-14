<template>
  <div class="ques-progress-wrap">
    <div
      v-for="(item, index) in questionList"
      :key="index">
      <div v-if="index === curQuesIndex">
        <!-- 短文阅读 -->
        <essay-reading
          v-if="progressStatus === 1"
          :questionIndex="index + 1"
          :questionData="item"
          @start-click-handle="startClickHandle()"
        ></essay-reading>
        <!-- 判断错别字 -->
        <judgment-word
          v-if="progressStatus === 2"
          :questionData="item"
          @time-end-handle="keyHandle(0)"
        ></judgment-word>
        <!-- 判断语义内容 -->
        <judgment-content
          v-if="progressStatus === 3"
          :questionData="item"
          @time-end-handle="keyHandle(0)"
        ></judgment-content>
      </div>
    </div>
  </div>
</template>

<script>
import EssayReading from './essay-reading.vue'
import JudgmentWord from './judgment-word.vue'
import JudgmentContent from './judgment-content.vue'

export default {
  name: 'VoiceQuesProgress',
  props: {
    curQuesIndex: {
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
    }
  },
  components: {
    EssayReading,
    JudgmentWord,
    JudgmentContent
  },
  data () {
    return {
      progressStatus: 1
    }
  },
  methods: {
    keyHandle (num) {
      // 短文阅读不进行操作
      if (this.progressStatus === 1) return
      // 获取判断错别字结束时间
      if (this.progressStatus === 2) {
        this.getEndTime(num)
      }
      this.progressStatus += 1

      if (this.progressStatus === 3) {
        // 获取语义内容字开始时间
        this.getStartTime()
      }

      if (this.progressStatus === 4) {
        this.getEndTime(num)
        if ((this.curQuesIndex + 1) === this.questionTotal) {
          this.$emit('answer-complete-handle')
        } else {
          this.$emit('current-index-change')
          this.progressStatus = 1
        }
      }
    },
    // 短文阅读完毕
    startClickHandle () {
      this.progressStatus = 2
      // 获取判断错别字开始时间
      this.getStartTime()
    },
    getStartTime () {
      const typeKey = this.progressStatus === 2 ? 'words_judge' : 'semantics_judge'
      const startTime = new Date().getTime()
      const answerData = {
        startTime: startTime
      }
      this.$emit('save-answer-data', typeKey, answerData, 'start')
    },
    getEndTime (code) {
      const typeKey = this.progressStatus === 2 ? 'words_judge' : 'semantics_judge'
      const ansKey = typeKey + '_keycode'
      const curQuesData = this.questionList[this.curQuesIndex]
      const isRight = Number(curQuesData[ansKey]) === Number(code) ? 1 : 0
      const endTime = new Date().getTime()
      const answerData = {
        type: typeKey,
        answer: isRight,
        endTime: endTime
      }
      this.$emit('save-answer-data', typeKey, answerData, 'end')
    }
  }
}
</script>

<style lang="less" scoped>
  .essay-reading-wrap {
    text-align: center;
    .essay-tips {
      margin-bottom: 40px;
      line-height: 26px;
      font-size: 26px;
      color: #33363E;
    }
    .essay-content-wrap {
      margin: 0 30px 24px;
      width: 1120px;
      height: 420px;
      border: 2px solid #CBD6E5;
      border-radius: 8px;
      .essay-content {
        margin: 159px auto 167px;
        display: block;
        width: 944px;
        line-height: 46px;
        font-size: 26px;
        color: #33363E;
        text-align: left;
        b {
          font-size: 32px;
          color: #33363E;
        }
      }
    }
  }

</style>

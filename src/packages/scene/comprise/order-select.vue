<template>
  <div class="order-select-wrap" :style="{backgroundImage: 'url(' + selectBg + ')'}">
    <div class="tips">{{tipsContent}}</div>
    <div :class="['options-box', optionDataList.length === 6 ? 'options-distance2' : 'options-distance1']" v-if="optionList.length > 0">
      <SelectBtn
        :class="'option' + answerNum"
        v-for="(option, index) in optionList"
        :key="index"
        :optionData="option"
        @click.native="answerHandle(option, index)"
      />
    </div>
    <div :class="['separation', optionDataList.length === 6 ? 'distance2' : 'distance1']"></div>
    <div class="answer-box" v-if="answerList.length > 0">
      <answer-btn
        :class="'option' + answerNum"
        v-for="(item, index) in answerList"
        :key="index"
        :answerData="item"
        @delete-answer="deleteAnswerHandle"
      ></answer-btn>
    </div>
    <button
      :class="['tswc-button', 'tswc-button-big', 'order-bottom', answerTotal === answerNum ? '' : 'disable']"
      @click="completeClick">
      <span>{{answerId === 'university_4' ? '完成本项答题' : '下一项'}}</span>
    </button>
  </div>
</template>

<script>
import SelectBtn from './select-btn.vue'
import AnswerBtn from './answer-btn.vue'

export default {
  name: 'OrderSelect',
  components: {
    SelectBtn,
    AnswerBtn
  },
  props: {
    selectBg: {
      type: String,
      default: ''
    },
    tipsContent: {
      type: String,
      default: ''
    },
    optionDataList: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    answerNum: {
      type: Number,
      default: 0
    },
    answerId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      answerTotal: 0,
      optionList: [],
      answerList: []
    }
  },
  watch: {
    optionDataList: {
      handler (newVal) {
        this.initData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initData () {
      this.optionDataList.forEach(option => {
        const data = {
          name: option,
          selectedFlag: false
        }
        this.optionList.push(data)
      })
      for (let i = 0; i < this.answerNum; i++) {
        const item = {
          index: i + 1,
          optionIndex: 0,
          name: ''
        }
        this.answerList.push(item)
      }
    },
    answerHandle (value, index) {
      if (value.selectedFlag) return
      if (this.answerTotal === this.answerNum) return
      this.$set(this.optionList[index], 'selectedFlag', true)
      let flag = false
      this.answerList.forEach((item, aIndex) => {
        if (item.name === '' && this.answerTotal > aIndex) {
          flag = true
          let conut = 0
          this.answerList.forEach((item1, value2) => {
            if (item1.name === value.name) {
              conut += 1
            }
          })
          if (conut === 0) {
            this.$set(this.answerList[aIndex], 'name', value.name)
            this.$set(this.answerList[aIndex], 'optionIndex', index)
          }
        }
      })
      if (!flag) {
        this.$set(this.answerList[this.answerTotal], 'name', value.name)
        this.$set(this.answerList[this.answerTotal], 'optionIndex', index)
      }
      this.answerTotal += 1
    },
    deleteAnswerHandle (optionIndex, index) {
      this.$set(this.optionList[optionIndex], 'selectedFlag', false)
      this.$set(this.answerList[index], 'name', '')
      this.answerTotal -= 1
    },
    completeClick () {
      if (this.answerTotal < this.answerNum) {
        return
      }
      const answer = []
      this.answerList.forEach(item => {
        answer.push(item.name)
      })
      this.$emit('click-button-handle', answer)
      this.answerTotal = 0
      this.optionList = []
      this.answerList = []
    }
  }
}
</script>

<style lang="less" scoped>
  .order-select-wrap {
    width: 100%;
    height: 100%;
    background-size: cover;
    text-align: center;
    .tips {
      width: 100%;
      padding: 10px 30px;
      line-height: 34px;
      font-size: 22px;
      color: #565A66;
      background: rgba(255, 255, 255, 0.7);
      text-align: center;
    }
    .options-box {
      margin: 0 30px 0 10px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .option6 {
        margin-left: 20px;
        margin-bottom: 12px;
        flex: 0 0 340px;
        height: 60px;
      }
      .option8 {
        margin-left: 20px;
        margin-bottom: 12px;
        flex: 0 0 250px;
        height: 60px;
      }
    }
    .options-distance1 {
      margin-top: 30px;
    }
    .options-distance2 {
      margin-top: 70px;
    }
    .separation {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.8);
      &::before {
        position: absolute;
        top: 15px;
        left: 15px;
        display: inline-block;
        content: '';
        width: 30px;
        height: 34px;
        background: url("../../../assets/img/arrow-down.png") no-repeat center center;
        background-size: cover;
      }
    }
    .distance1 {
      margin: 20px auto 20px;
    }
    .distance2 {
      margin: 28px auto 24px;
    }
    .answer-box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin: 0 14px;
      padding: 24px 6px 12px 6px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.4);
      .option6 {
        margin: 0 10px 12px;
        flex: 0 0 340px;
        height: 60px;
      }
      .option8 {
        margin-left: 20px;
        margin-bottom: 12px;
        flex: 0 0 250px;
        height: 60px;
      }
    }
    .order-bottom {
      position: absolute;
      left: 50%;
      bottom: 30px;
      margin-left: -140px;
    }
    .disable {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>

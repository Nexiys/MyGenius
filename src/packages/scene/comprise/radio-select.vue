<template>
  <div
    class="radio-select-wrap"
    :style="{backgroundImage: 'url(' + dialogBg + ')'}">
    <div class="tips">{{tipsContent}}</div>
    <div :class="['options-box', optionData.length === 6 ? 'options-distance1' : 'options-distance2']">
      <div
        :class="['option',optionData.length === 6 ? 'size6' : 'size-more', {'select': filterSelection(option)}]"
        v-for="option in optionData"
        :key="option"
        @click="selectOption(option)"
      >
        {{option}}
        <div v-if="filterSelection(option)" class="select-box">
          <i class="icon icon-subject-choose-correct"></i>
        </div>
      </div>
    </div>
    <button
      :class="[
        'tswc-button',
        'tswc-button-primary',
        'order-bottom',
        { 'active': answer.length === answerNum || (answerNum === 100&&answer.length > 0) }
      ]"
      @click="clickNextHandle">
      <span>{{answerId === 'university_4' ? '完成本项答题' : '下一项'}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'RadioSelect',
  props: {
    dialogBg: {
      type: String,
      default: ''
    },
    tipsContent: {
      type: String,
      default: ''
    },
    optionData: {
      type: Array,
      default () {
        return []
      }
    },
    answerNum: {
      type: Number,
      default: 100
    },
    answerId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      answer: []
    }
  },
  methods: {
    filterSelection (value) {
      if (this.answer.indexOf(value) < 0) {
        return false
      } else {
        return true
      }
    },
    selectOption (value) {
      if (this.answerNum === 1) { // 单选
        this.answer = [value]
      } else if (this.answerNum !== 1 && this.answerNum !== 100) { // 多选
        if (this.answer.indexOf(value) < 0) {
          if (this.answer.length < this.answerNum) {
            this.answer.push(value)
          }
        } else {
          const position1 = this.answer.indexOf(value)
          this.answer.splice(position1, 1)
        }
      } else { // 不定项
        if (this.answer.indexOf(value) < 0) {
          if (this.answer.length < this.optionData.length) {
            this.answer.push(value)
          }
        } else {
          const position2 = this.answer.indexOf(value)
          this.answer.splice(position2, 1)
        }
      }
    },
    clickNextHandle () {
      if (this.answerNum !== 100 && this.answer.length !== this.answerNum) {
        return
      }
      if (this.answerNum === 100 && this.answer.length === 0) {
        return
      }
      this.$emit('click-change-handle', this.answer)
      this.answer = []
    }
  }
}
</script>

<style lang="less" scoped>
  .radio-select-wrap {
    width: 100%;
    height: 100%;
    background-size: cover;
    text-align: center;
    .tips {
      width: 100%;
      height: 54px;
      line-height: 54px;
      font-size: 22px;
      color: #565A66;
      background: rgba(255, 255, 255, 0.7);
      text-align: center;
    }
    .content {
      width: 700px;
      height: 130px;
      line-height: 130px;
      font-size: 24px;
      color: #33363E;
      background: rgba(255, 255, 255, 0.8);
      text-align: center;
    }
    .options-box {
      margin: 160px 30px 30px 10px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      font-size: 0;
      .option {
        position: relative;
        margin-left: 20px;
        height: 60px;
        line-height: 60px;
        border-radius: 4px;
        border: 2px solid rgba(255, 255, 255, 0.9);
        font-size: 18px;
        color: #33363E;
        background: rgba(255, 255, 255, 0.9);
        text-align: center;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
      }
      .size6 {
        flex: 0 0 340px;
        margin-bottom: 40px;
      }
      .size-more {
        flex: 0 0 196px;
        margin-bottom: 20px;
      }
      .select {
        border: 2px solid #51A7FB;
      }
      .select-box {
        position: absolute;
        right: -1px;
        bottom: -1px;
        width: 0;
        height: 0;
        border-bottom: 30px solid #51A7FB;
        border-left: 42px solid transparent;
        color: #fff;
        .icon {
          position: absolute;
          top: 14px;
          right: 5px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .options-distance1 {
      margin-top: 160px;
    }
    .options-distance2 {
      margin-top: 40px;
    }
    .order-bottom {
      position: absolute;
      left: 50%;
      bottom: 30px;
      margin-left: -140px;
      opacity: 0.6;
      cursor: not-allowed;
    }
    .disable {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .active {
      opacity: 1;
      cursor: pointer;
    }
  }
</style>

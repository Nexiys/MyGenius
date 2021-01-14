<template>
  <div
    class="radio-select-wrap"
    :style="{backgroundImage: 'url(' + dialogBg + ')'}">
    <div class="tips">{{tipsContent}}</div>
    <div class="options-box">
      <div
        :class="['option', {'select': filterSelection(option)}]"
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
        { 'active': answer.length > 0 }
      ]"
      @click="clickNextHandle">
      <span>完成本项</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ImmigrantRadioSelect',
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
      if (this.answer.length < this.optionData.length) {
        if (this.answer.indexOf(value) < 0) {
          this.answer.push(value)
        } else {
          const position = this.answer.indexOf(value)
          this.answer.splice(position, 1)
        }
      }
    },
    clickNextHandle () {
      if (this.answer.length === 0) {
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
    .options-box {
      margin: 30px 30px 30px 10px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      font-size: 0;
      .option {
        display: flex;
        align-items: center;
        flex: 0 0 520px;
        margin-bottom: 12px;
        position: relative;
        margin-left: 20px;
        padding: 8px 24px;
        height: 60px;
        line-height: 22px;
        border-radius: 4px;
        border: 2px solid rgba(255, 255, 255, 0.9);
        font-size: 18px;
        color: #33363E;
        background: rgba(255, 255, 255, 0.9);
        text-align: left;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
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
          top: 15px;
          right: 5px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .order-bottom {
      position: absolute;
      left: 50%;
      bottom: 30px;
      margin-left: -140px;
      opacity: 0.6;
      cursor: not-allowed;
    }
    .active {
      opacity: 1;
      cursor: pointer;
    }
  }
</style>

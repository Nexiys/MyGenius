<template>
  <div :class="['answer-btn', {'selected': isDeleteFlag}]" @mouseenter="enterHandle" @mouseleave="leaveHandle">
    <span class="num">{{answerData.index}}</span>
    <span class="word">{{answerData.name}}</span>
    <i
      v-if="isDeleteFlag"
      class="delete icon-subject-choose-error"
      @click="deleteAnswer"
    ></i>
  </div>
</template>

<script>

export default {
  name: 'AnswerBtn',
  props: {
    answerData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isDeleteFlag: false
    }
  },
  methods: {
    enterHandle () {
      if (!this.answerData.name) return
      this.isDeleteFlag = true
    },
    leaveHandle () {
      this.isDeleteFlag = false
    },
    deleteAnswer () {
      this.isDeleteFlag = false
      this.$emit('delete-answer', this.answerData.optionIndex, (this.answerData.index - 1))
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-btn {
    position: relative;
    padding: 14px 0px 14px 12px;
    width: 340px;
    height: 60px;
    border-radius: 4px;
    line-height: 28px;
    border: 2px dashed #47A1FE;
    font-size: 0;
    color: #33363E;
    background: rgba(255, 255, 255, 0.9);
    text-align: left;
    .num {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 100%;
      font-size: 18px;
      color: #ffffff;
      background: #47A1FE;
      text-align: center;
    }
    .word {
      margin-left: 10px;
      font-size: 18px;
      color: #33363E;
    }
    .delete {
      position: absolute;
      right: 12px;
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 100%;
      font-size: 14px;
      color: #ffffff;
      background: #ED5C52;
      text-align: center;
      cursor: pointer;
    }
  }
  .selected {
    border: 2px solid #47A1FE;
  }
</style>

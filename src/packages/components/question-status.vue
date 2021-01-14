<template>
  <div class="question-status-wrap">
    <div class="status-word">
      {{statusMap[questionStatus]}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'QuestionStatus',
  props: {
    questionStatus: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      statusMap: {
        1: '练习阶段',
        2: '正式阶段'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .question-status-wrap {
    margin: 24px 30px;
    text-align: left;
    .status-word {
      line-height: 26px;
      font-size: 26px;
      color: #33363E;
    }
  }
</style>

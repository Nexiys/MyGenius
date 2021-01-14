<template>
  <div class="essay-reading-wrap">
    <div class="essay-tips">请认真阅读短文</div>
    <div class="essay-content-wrap">
      <p class="essay-content" v-html="questionIndex + '.' + questionData.content"></p>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="startClickHandle">
      <span>开始答题</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'EssayReading',
  props: {
    questionIndex: {
      type: Number,
      default: 0
    },
    questionData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    startClickHandle () {
      this.$emit('start-click-handle')
    }
  }
}
</script>

<style lang="less" scoped>
  .essay-reading-wrap {
    text-align: center;
    .essay-tips {
      margin-bottom: 40px;
      padding-top: 30px;
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
        /deep/ b {
          line-height: 60px;
          font-size: 32px;
          color: #33363E;
        }
      }
    }
  }

</style>

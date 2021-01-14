<template>
  <div class="essay-reading-wrap">
    <div class="essay-tips">请认真阅读题目介绍</div>
    <div class="essay-content-wrap">
      <p class="essay-content" v-if="nineGridsFlag">屏幕中央呈现9个灰色方块，点击开始按钮, 蓝色目标方块会在9个位置上随机闪现请您记住目标方块闪现的位置和顺序</p>
      <p class="essay-content" v-if="!nineGridsFlag">屏幕中央呈现25个正方形，点击开始按钮, 箭头会依次指向多个正方形，请您记住箭头指向的正方形</p>
      <button
        class="tswc-button tswc-button-primary"
        @click="startClickHandle">
        <span>开始答题</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EssayReading',
  props: {
    nineGridsFlag: {
      type: Boolean,
      default: true
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
      padding-top: 30px;
      margin-bottom: 40px;
      line-height: 26px;
      font-size: 26px;
      color: #33363E;
    }
    .essay-content-wrap {
      margin: 0 30px;
      width: 1120px;
      height: 498px;
      border: 2px solid #CBD6E5;
      border-radius: 8px;
      .essay-content {
        margin: 140px auto 66px;
        display: block;
        width: 940px;
        line-height: 46px;
        font-size: 26px;
        color: #33363E;
        text-align: center;
      }
    }
  }
</style>

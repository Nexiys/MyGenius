<template>
  <div class="block-wrap">
    <div class="title-container">
      <h3 class="title">{{blockTitle}}</h3>
      <h3 v-if="rightWord" class="rightWord">{{rightWord}}</h3>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LeftBlock',
  props: {
    blockTitle: {
      type: String,
      default: '综合分析'
    },
    rightWord: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .block-wrap {
    position: relative;
    margin-top: 12px;
    padding: 24px 26px 30px;
    width: 940px;
    background: #ffffff;
    &::before {
      position: absolute;
      top: 24px;
      left: 0;
      content: '';
      display: inline-block;
      width: 5px;
      height: 22px;
      background: #47A1FE;
    }
    .title-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .title {
      padding-bottom: 26px;
      line-height: 20px;
      font-size: 20px;
      font-weight: 400;
      color: #33363E;
    }
    .rightWord {
      margin-top: 2px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: #47A1FE;
    }
  }

</style>

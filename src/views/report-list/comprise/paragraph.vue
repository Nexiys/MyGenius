<template>
  <div :class="['paragraph-wrap', mgbtValue, pdlfValue, fontColor]">
    <div :class="[isIndent ? 'indent' : '']" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'Paragraph',
  props: {
    content: {
      type: String,
      default: '哈哈哈'
    },
    mgbtValue: {
      type: String,
      default: ''
    },
    pdlfValue: {
      type: String,
      default: ''
    },
    isIndent: {
      type: Boolean,
      default: false
    },
    fontColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .paragraph-wrap {
    padding-left: 36px;
    line-height: 22px;
    font-size: 14px;
    color: #565A66;
  }
  .mgbt16 {
    margin-bottom: 16px;
  }
  .mgbt20 {
    margin-bottom: 20px;
  }
  .mgbt24 {
    margin-bottom: 24px;
  }
  .indent {
    text-indent: 30px;
    /deep/ p {
      text-indent: 30px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .pdlf18 {
    padding-left: 54px;
  }
  .color9 {
    color: #848894;
  }
</style>

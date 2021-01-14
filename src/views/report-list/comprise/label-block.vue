<template>
  <div :class="['label-block-wrap', bgValue, mgbtValue, wdValue, htValue]">
    <div :class="['label', nameColor]">{{name}}</div>
    <div :class="['content', isIndent ? 'indent' : '']" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'LabelBlock',
  props: {
    name: {
      type: String,
      default: '哈哈哈'
    },
    nameColor: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '哈哈哈'
    },
    bgValue: {
      type: String,
      default: ''
    },
    wdValue: {
      type: String,
      default: ''
    },
    htValue: {
      type: String,
      default: ''
    },
    mgbtValue: {
      type: String,
      default: ''
    },
    isIndent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  .label-block-wrap {
    position: relative;
    margin-left: 36px;
    margin-bottom: 16px;
    width: 856px;
    border-radius: 4px;
    line-height: 22px;
    font-size: 14px;
    color: #565A66;
    .label {
      position: absolute;
      top: 0;
      left: 0;
      width: 90px;
      height: 26px;
      line-height: 26px;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
    }
    .content {
      padding: 42px 20px 20px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .wd420 {
    width: 420px;
  }
  .ht128 {
    height: 128px;
  }
  .no-mglf {
    margin-left: 0;
  }
  .mgbt0 {
    margin-bottom: 0;
  }
  .mgbt20 {
    margin-bottom: 20px;
  }
  .block-bg2 {
    background: rgba(117, 183, 255, 0.12);
  }
  .block-bg3 {
    background: rgba(141, 204, 116, 0.12);
  }
  .block-bg4 {
    background: rgba(246, 141, 123, 0.12);
  }
</style>

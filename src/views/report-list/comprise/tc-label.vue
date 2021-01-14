<template>
  <div :class="['tc-label-wrap', mgbtValue]">
    <div :class="['label', 'bg' + bgMap[index + 1]]" v-for="(tag, index) in tagsList" :key="tag.name">
      {{tag.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TcLabel',
  props: {
    tagsList: {
      type: Array,
      default () {
        return []
      }
    },
    mgbtValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      bgMap: {
        1: '1',
        2: '2',
        3: '5'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .tc-label-wrap {
    margin-left: 36px;
    margin-bottom: 24px;
    .label {
      display: inline-block;
      margin-right: 20px;
      width: 100px;
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .mgbt16 {
    margin-bottom: 16px;
  }
  .mgbt20 {
    margin-bottom: 20px;
  }
</style>

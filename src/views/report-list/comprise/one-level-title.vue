<template>
  <div :class="['one-level-title-wrap', mgbtValue]">
    <div>
      <i
        :class="['icon', iconColor]"
      ></i>
      <h5 :class="fontColor ? fontColor : 'color-defalut'">{{title}}</h5>
    </div>
    <div class="right-word" v-if="rightWord">{{rightWord}}</div>
  </div>
</template>

<script>
export default {
  name: 'OneLevelTitle',
  props: {
    title: {
      type: String,
      default: '综合分析'
    },
    iconColor: {
      type: String,
      default: 'bg1'
    },
    mgbtValue: {
      type: String,
      default: ''
    },
    rightWord: {
      type: String,
      default: ''
    },
    fontColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .one-level-title-wrap {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 36px;
    margin-bottom: 12px;
    .icon {
      position: absolute;
      left: 0;
      top: 6px;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }
    h5 {
      position: relative;
      padding-left: 20px;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
    }
    .right-word {
      font-size: 14px;
      color: #47A1FE;
    }
  }
  .mgbt0 {
    margin-bottom: 0;
  }
  .mgbt5 {
    margin-bottom: 5px;
  }
  .mgbt6 {
    margin-bottom: 6px;
  }
  .mgbt14 {
    margin-bottom: 14px;
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
  .color-defalut {
    color: #33363E;
  }
  .color9 {
    color: #565A66;
  }
</style>

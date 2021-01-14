<template>
  <div class="sub-title-wrap">
    <i
      :class="['icon', iconName, iconColor]"
    ></i>
    <h5>{{title}}</h5>
  </div>
</template>

<script>
export default {
  name: 'SubTitle',
  props: {
    title: {
      type: String,
      default: '综合分析'
    },
    iconName: {
      type: String,
      default: 'icon-report-comprehensive'
    },
    iconColor: {
      type: String,
      default: 'color1'
    }
  }
}
</script>

<style lang="less" scoped>
  .sub-title-wrap {
    display: flex;
    margin-bottom: 20px;
    .icon {
      margin-right: 12px;
      font-size: 24px;
    }
    h5 {
      padding-bottom: 16px;
      width: 100%;
      font-size: 16px;
      font-weight: 400;
      color: #33363E;
      border-bottom: 1px solid #D8E1E8;
    }
  }
</style>

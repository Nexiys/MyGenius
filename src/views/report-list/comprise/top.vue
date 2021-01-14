<template>
  <div :class="['top-wrap', 'bg' + reportType]">
    <div class="left-box">
      <div class="left-icon-box">
        <i :class="['icon', reportIcon, 'color' + reportType]"></i>
      </div>
      <div class="left-word-box">
        <h1>{{title}}</h1>
        <p>{{description}}</p>
      </div>
    </div>
    <div class="right-box">{{total}}</div>
  </div>
</template>

<script>
export default {
  name: 'LeftTop',
  props: {
    reportType: {
      type: String,
      default: '1'
    },
    title: {
      type: String,
      default: '综合分析'
    },
    description: {
      type: String,
      default: '四大维度多元化分析，反映最真实的自己'
    },
    total: {
      type: String,
      default: '共0页'
    }
  },
  computed: {
    reportIcon () {
      return this.iconMap[this.reportType]
    }
  },
  data () {
    return {
      iconMap: {
        1: 'icon-report-comprehensive',
        2: 'icon-report-cognitive',
        3: 'icon-report-learning',
        4: 'icon-report-interest',
        5: 'icon-report-character',
        6: 'icon-report-selected-subjects',
        7: 'icon-report-wish-filling',
        8: 'icon-report-career'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .top-wrap {
    display: flex;
    padding: 15px 24px;
    width: 940px;
    height: 84px;
    color: #ffffff;
    .left-box {
      flex: 1;
      display: flex;
    }
    .right-box {
      font-size: 20px;
      line-height: 54px;
    }
    .left-icon-box {
      margin-right: 12px;
      width: 54px;
      height: 54px;
      border-radius: 100%;
      background: #ffffff;
      text-align: center;
      .icon {
        line-height: 54px;
        font-size: 30px;
      }
    }
    .left-word-box {
      color: #ffffff;
      h1 {
        margin: 5px 0 10px;
        line-height: 20px;
        font-size: 20px;
      }
      p {
        line-height: 14px;
        font-size: 14px;
      }
    }
  }
</style>

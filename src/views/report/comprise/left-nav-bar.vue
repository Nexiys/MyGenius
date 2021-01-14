<template>
  <div class="left-nav-bar">
    <ul class="item-box">
      <router-link
        active-class="selected"
        class="item"
        to="/report/whole"
        tag="li"
      >
        <i class="icon icon-report-comprehensive color1"></i>
        <span class="title">综合分析</span>
        <em class="num">{{isReady ? '8' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/perception"
        tag="li"
      >
        <i class="icon icon-report-cognitive color2"></i>
        <span class="title">认知潜能</span>
        <em class="num">{{isReady ? '5' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/learning"
        tag="li"
      >
        <i class="icon icon-report-learning color3"></i>
        <span class="title">学习潜能</span>
        <em class="num">{{isReady ? '3' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/interest"
        tag="li"
      >
        <i class="icon icon-report-interest color4"></i>
        <span class="title">兴趣倾向</span>
        <em class="num">{{isReady ? '6' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/character"
        tag="li"
      >
        <i class="icon icon-report-character color5"></i>
        <span class="title">性格特点</span>
        <em class="num">{{isReady ? '2' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/selection"
        tag="li"
      >
        <i class="icon icon-report-selected-subjects color6"></i>
        <span class="title">选科规划</span>
        <em class="num">{{isReady ? '4' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/volunteer"
        tag="li"
      >
        <i class="icon icon-report-wish-filling color7"></i>
        <span class="title">志愿填报</span>
        <em class="num">{{isReady ? '4' : '0'}}项</em>
      </router-link>
      <router-link
        active-class="selected"
        class="item"
        to="/report/career"
        tag="li"
      >
        <i class="icon icon-report-career color8"></i>
        <span class="title">职业发展</span>
        <em class="num">{{isReady ? '8' : '0'}}项</em>
      </router-link>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'LeftNavBar',
  props: {
    isReady: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  .left-nav-bar {
    width: 220px;
    height: 478px;
    background: #ffffff;
    .item-box {
      padding: 19px 12px;
    }
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      padding: 14px 12px;
      font-size: 16px;
      cursor: pointer;
      .icon {
        display: inline-block;
        margin-right: 12px;
        font-size: 24px;
      }
      .title {
        margin-right: 46px;
        font-size: 16px;
        color: #33363E;
      }
      .num {
        font-size: 16px;
        color: #B2B9C5;
        text-align: right;
      }
      &:hover {
        border-radius: 4px;
        background: #EFF4FA;
      }
    }
    .selected {
      border-radius: 4px;
      background: #EFF4FA;
    }
  }
</style>

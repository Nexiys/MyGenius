<template>
  <div class="lenovo-strategy-rule-wrap">
    <div class="lenovo-strategy-rule-lf"></div>
    <div class="lenovo-strategy-rule-rt">
      <div class="title">游戏规则</div>
      <div class="lenovo-strategy-describe">
        <p class="p1">接下来屏幕中将呈现两个动物，分别匹配3个名字，一共六个词图组合。6个词图随机排列。</p>
        <p class="p1">请记住它们的名字，共呈现3遍，您有3次学习机会，学习完毕后会考察你记忆情况哦～</p>
      </div>
      <div class="arrow">
        <span class="outer"></span>
        <span class="inner"></span>
      </div>
      <button
        class="tswc-button tswc-button-primary"
        @click="startClickHandle">
        <span>开始学习</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LenovoStrategyRule',
  methods: {
    startClickHandle () {
      this.$emit('rule-complete')
    }
  }
}
</script>

<style lang="less" scoped>
  .lenovo-strategy-rule-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1120px;
    height: 700px;
    .lenovo-strategy-rule-lf {
      flex: 0 0 370px;
      height: 380px;
      background: url("../../../assets/img/lenovo-dec.png") no-repeat center center;
      background-size: cover;
    }
  }
  .lenovo-strategy-rule-rt {
    position: relative;
    padding: 30px 40px;
    width: 610px;
    height: 402px;
    margin-left: 36px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    text-align: center;
    .arrow {
      position: absolute;
      top: 38px;
      left: -34px;
      width: 34px;
      height: 52px;
      & > span {
        position: absolute;
        display: block;
        line-height: 0;
        border-style: dashed solid solid dashed;
        font-size: 0;
      }
      .outer {
        border-color: transparent #EBF3FF #EBF3FF transparent;
        border-width: 26px 17px;
      }
      .inner {
        border-color: transparent #a6dcfc #a6dcfc transparent;
        border-width: 6px 17px;
        bottom: 0;
      }
    }
    .title {
      margin-top: 20px;
      margin-bottom: 40px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      color: #006AD7;
    }
    .lenovo-strategy-describe {
      margin-bottom: 30px;
      color: #33363E;
      text-align: left;
      .p1 {
        line-height: 30px;
        font-size: 20px;
      }
    }
  }
</style>

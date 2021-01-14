<template>
  <div class="scene-intro-wrap" :style="{backgroundImage: 'url(' + selectData.background + ')'}">
    <div class="scene-intro-lf"></div>
    <div class="scene-intro-rt">
      <div class="title">{{selectData.title}}</div>
      <div class="scene-intro-describe">
        <p class="p1">{{selectData.content}}</p>
      </div>
      <div class="arrow">
        <span class="outer"></span>
        <span class="inner"></span>
      </div>
      <button
        class="tswc-button tswc-button-primary"
        @click="startClickHandle">
        <span>开始选择</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneIntro',
  props: {
    selectData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  methods: {
    startClickHandle () {
      this.$emit('intro-complete')
    }
  }
}
</script>

<style lang="less" scoped>
  .scene-intro-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1120px;
    height: 700px;
    background-size: cover;
    .scene-intro-lf {
      flex: 0 0 370px;
      height: 380px;
      background: url("../../../assets/img/scene-guide.png") no-repeat center center;
      background-size: cover;
    }
  }
  .scene-intro-rt {
    position: relative;
    padding: 30px 40px;
    width: 610px;
    height: 380px;
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
    .scene-intro-describe {
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

<template>
  <div class="image-card-wrap">
    <div :class="[
      'img-box',
      {'defalut': selectStatus === 1},
      {'no-select': selectStatus === 2&&!isSelect},
      {'right': selectStatus === 2&&isSelect&&isRight},
      {'false': selectStatus === 2&&isSelect&&!isRight}
    ]">
      <img :src="imgSrc">
    </div>
    <div v-if="selectStatus === 2&&isSelect" :class="['result-box', isRight ? 'right-select' : 'false-select']">
      <i :class="['icon', isRight ? 'icon-subject-choose-correct': 'icon-subject-choose-error']"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ImageCard',
  props: {
    imgSrc: {
      type: String,
      default: 'http://www.ruggear.mobi/img/jylxcl/giraffe-monkey.png'
    },
    selectStatus: {
      type: Number,
      default: 0
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    isRight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  .image-card-wrap {
    position: relative;
    .img-box {
      padding: 59px 50px;
      width: 240px;
      height: 280px;
      border: 4px solid #47A1FE;
      border-radius: 8px;
      background: #FFFFFF;
    }
    img {
      width: 140px;
      height: 162px;
    }
    .result-box {
      position: absolute;
      right: 3px;
      bottom: 4px;
      width: 0;
      height: 0;
      border-bottom: 58px solid #ED5C52;
      border-left: 80px solid transparent;
      color: #fff;
    }
    .defalut {
      border-color: #47A1FE;
    }
    .false {
      border-color: #ED5C52;
    }
    .right {
      border-color: #29C73E;
    }
    .false-select {
      border-bottom: 58px solid #ED5C52;
    }
    .right-select {
      border-bottom: 58px solid #29C73E;
    }
    .no-select {
      border-color: rgba(71, 161, 254, 0.5);
    }
    .icon {
      position: absolute;
      top: 30px;
      right: 12px;
      font-size: 20px;
      color: #ffffff;
    }
  }

</style>

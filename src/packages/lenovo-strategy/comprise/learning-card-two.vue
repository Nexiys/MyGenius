<template>
  <div class="learning-card-wrap">
    <div class="learning-card">
      <div class="title">{{cardData.none_word}}</div>
      <div class="img-box">
        <img :src="cardData.image">
      </div>
    </div>
    <div class="learning-card">
      <div class="title">{{cardData.symbol}}</div>
      <div class="img-box">
        <img :src="cardData.image">
      </div>
    </div>
    <div class="learning-card">
      <div class="title">{{cardData.word}}</div>
      <div class="img-box">
        <img :src="cardData.image">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LearningCard',
  props: {
    cardData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .learning-card-wrap {
    margin: 0 auto 36px;
    width: 870px;
    .learning-card {
      position: relative;
      display: inline-block;
      margin: 0 40px;
      width: 210px;
      height: 280px;
      border: 4px solid #47A1FE;
      border-radius: 8px;
      background: #FFFFFF;
      font-size: 0;
    }
    .title {
      position: absolute;
      top: -2px;
      left: -2px;
      width: 206px;
      height: 56px;
      line-height: 56px;
      font-size: 28px;
      color: #FFFFFF;
      background: #47A1FE;
      text-align: center;
    }
    .img-box {
      position: absolute;
      top: 92px;
      left: 50%;
      margin-left: -70px;
      & > img {
        width: 140px;
        height: 162px;
      }
    }
  }

</style>

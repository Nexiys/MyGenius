<template>
  <div class="learning-stage-wrap">
    <div class="status-word">学习阶段</div>
    <div class="learning-tips">蓝色判断单字是动词/名词</div>
    <div class="learning-content-wrap">
      <div class="learning-content">
        <div class="arrow-box">
          <span class="word mt-36">长方形+数字+字</span>
          <span class="dec"></span>
          <div class="square">
            <span>听</span>
            <span>43</span>
          </div>
        </div>
        <div class="img-arrow-box">
          <div class="word">长方形为蓝色</div>
          <div class="img-arrow"></div>
        </div>
        <div class="arrow-box">
          <span class="word mt-36">蓝色只需观察字</span>
          <span class="dec"></span>
          <div class="square">
            <span>听</span>
          </div>
        </div>
        <div class="img-arrow-box">
          <div class="word">听为动词</div>
          <div class="img-arrow"></div>
        </div>
        <div class="arrow-box">
          <span class="word mt-20">名词按“←”键</span>
          <span class="word">动词按“→”键</span>
          <span class="dec"></span>
          <div class="square">
            <span>“→”</span>
            <span>键</span>
          </div>
        </div>
      </div>
    </div>
    <button
      class="tswc-button tswc-button-primary"
      @click="btnClickHandle">
      <span>我记住了</span>
    </button>
  </div>
</template>

<script>

export default {
  name: 'LearningsStageBlue',
  props: {
    questionIndex: {
      type: Number,
      default: 0
    },
    questionData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    btnClickHandle () {
      this.$emit('learning-stage-handle')
    }
  }
}
</script>

<style lang="less" scoped>
  .learning-stage-wrap {
    text-align: center;
    .status-word {
      margin: 24px 30px 54px;
      line-height: 26px;
      font-size: 26px;
      color: #33363E;
      text-align: left;
    }
    .learning-tips {
      margin-bottom: 40px;
      line-height: 26px;
      font-size: 26px;
      color: #33363E;
    }
    .learning-content-wrap {
      margin: 0 30px 24px;
      width: 1120px;
      height: 420px;
      border: 2px solid #CBD6E5;
      border-radius: 8px;
      .learning-content {
        display: flex;
        margin: 100px auto;
        width: 920px;
      }
      .arrow-box {
        position: relative;
        width: 180px;
        height: 94px;
        border: 1px solid #CBD6E5;
        border-radius: 4px;
        &::before, &::after {
          top: 100%;
          left: 50%;
          border: solid transparent;
          content: " ";
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
        }
        &::before {
          border-color: rgba(194, 225, 245, 0);
          border-top-color: #CBD6E5;
          border-width: 20px;
          margin-left: -20px;
        }
        &::after {
          border-color: rgba(136, 183, 213, 0);
          border-top-color: #ffffff;
          border-width: 19px;
          margin-left: -19px;
        }
        .word {
          display: inline-block;
          line-height: 28px;
          font-size: 18px;
          color: #565A66;
          text-align: center;
        }
        .mt-36 {
          margin-top: 32px;
        }
        .mt-20 {
          margin-top: 20px;
        }
        .dec {
          position: absolute;
          left: 50%;
          bottom: -47px;
          display: inline-block;
          width: 1px;
          height: 27px;
          background: #CBD6E5;
          transform: translate(-50%, 0);
          &::after {
            position: absolute;
            left: -3px;
            bottom: -7px;
            content: '';
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #CBD6E5;
          }
        }
        .square {
          position: absolute;
          bottom: -129px;
          width: 180px;
          height: 60px;
          border-radius: 4px;
          background: #47A1FE;
          & > span {
            padding: 0 12px;
            line-height: 60px;
            font-size: 26px;
            color: #FFFFFF;
          }
        }
      }
      .img-arrow-box {
        margin: 0 40px;
        text-align: center;
        .word {
          margin-bottom: 10px;
          width: 110px;
          line-height: 28px;
          font-size: 18px;
          color: #565A66;
        }
        .img-arrow {
          margin: 0 auto;
          width: 40px;
          height: 24px;
          background: url("../../../assets/img/arrow.png") no-repeat center center;
          background-size: cover;
        }
      }
    }
  }

</style>

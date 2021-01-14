<template>
  <div class="judgment-countdown-wrap">
    <div class="judgment-tips">请在键盘上按“←”键或“→”键</div>
    <div class="judgment-content-wrap">
      <div class="judgment-content">
        <div :class="['square-box', questionData.color === 'red' ? 'red' : 'blue']">
          <div
            v-if="questionData.num_first === 1"
            class="square"
          >
            <span>{{questionData.num}}</span>
            <span>{{questionData.word}}</span>
          </div>
          <div
            v-else
            class="square"
          >
            <span>{{questionData.word}}</span>
            <span>{{questionData.num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JudgmentSquare',
  props: {
    questionData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .judgment-countdown-wrap {
    text-align: center;
    .judgment-tips {
      margin-bottom: 70px;
      line-height: 26px;
      font-size: 26px;
      color: #33363E;
    }
    .judgment-content-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      width: 1120px;
      height: 498px;
      border: 2px solid #CBD6E5;
      border-radius: 8px;
      .judgment-content {
        max-width: 944px;
        line-height: 45px;
        font-size: 26px;
        color: #33363E;
      }
      .square-box {
        width: 324px;
        height: 108px;
        border-radius: 4px;
        line-height: 56px;
        font-size: 56px;
        color: #FFFFFF;
        .square {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 26px 76px;
          width: 324px;
          text-align: justify;
        }
      }
      .red {
        background: #E97171;
      }
      .blue {
        background: #47A1FE;
      }
    }
  }
</style>

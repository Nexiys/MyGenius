<template>
  <div class="answer-progress-wrap">
    <div class="tips">请点击词或符号所对应的动物图片</div>
    <div class="content">{{questionData.content}}</div>
    <div class="img-box">
      <div
        :class="['card', questionData.option && questionData.option.length > 2 ? 'mr-3' : 'mr-2']"
        v-for="(imageSrc, index) in questionData.option"
        :key="index"
        @click="cardClickHandle(imageSrc, index)"
      >
        <image-card
          :imgSrc="imageSrc"
          :selectStatus="selectStatus"
          :isSelect="index === curIndex"
          :isRight="answerFlag"
        ></image-card>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCard from './image-card.vue'

export default {
  name: 'AnswerProgress',
  props: {
    questionData: {
      type: Object,
      default () {
        return {
          content: '',
          option: []
        }
      }
    }
  },
  components: {
    ImageCard
  },
  data () {
    return {
      curIndex: 0,
      selectStatus: 1, // 1：没有作答， 2: 作答
      isCurrentSelect: false,
      answerFlag: false
    }
  },
  methods: {
    cardClickHandle (select, index) {
      this.curIndex = index
      this.selectStatus = 2
      if (select === this.questionData.answer) {
        this.answerFlag = true
      } else {
        this.answerFlag = false
      }
      const that = this
      setTimeout(() => {
        that.$emit('next-ques', this.answerFlag)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-progress-wrap {
    text-align: center;
    .tips {
      width: 100%;
      height: 54px;
      line-height: 54px;
      font-size: 22px;
      color: #565A66;
      background: rgba(255, 255, 255, 0.5);
      text-align: center;
    }
    .content {
      margin: 76px auto 90px;
      width: 210px;
      height: 70px;
      line-height: 70px;
      border-radius: 8px;
      font-size: 24px;
      color: #33363E;
      background: rgba(255, 255, 255, 0.5);
    }
    .img-box {
      margin: 0 auto;
      .card {
        display: inline-block;
        &:last-child {
          margin-right: 0;
        }
      }
      .mr-2 {
        margin-right: 170px;
      }
      .mr-3 {
        margin-right: 60px;
      }
    }
  }

</style>

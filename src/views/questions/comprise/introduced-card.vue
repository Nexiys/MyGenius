<template>
  <div class="introduce-card-wrap">
    <!-- header 进度、名称、用时 -->
    <progress-header></progress-header>
    <div class="introduce-content">
      <div class="lf"></div>
      <div :class="['rt', 'rt-' + type]">
        <!-- 题型介绍 -->
        <question-introduce :type="type"></question-introduce>
        <button
          class="tswc-button tswc-button-primary"
          @click="introducedCompleteHandle">
          <span>开始答题</span>
        </button>
        <div class="arrow">
          <span class="outer"></span>
          <span class="inner"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressHeader from '@/packages/components/progress-header.vue'
import QuestionIntroduce from '../question-introduce'

export default {
  name: 'IntroducedCard',
  components: {
    ProgressHeader,
    QuestionIntroduce
  },
  props: {
    type: {
      type: Number,
      default: 13
    }
  },
  methods: {
    introducedCompleteHandle () {
      this.$emit('introduced-complet')
    }
  }
}
</script>

<style lang="less" scoped>
  .introduce-card-wrap {
    .introduce-content {
      display: flex;
      align-items: center;
      margin: 125px 60px 172px;
      .lf {
        flex: 0 0 370px;
        height: 380px;
        background: url("../../../assets/img/reaction-bg.png") no-repeat center center;
        background-size: cover;
      }
      .rt {
        position: relative;
        padding: 30px 36px;
        width: 610px;
        height: 402px;
        margin-left: 80px;
        border-radius: 8px;
        background-color: #EBF3FF;
        text-align: center;
        .arrow {
          position: absolute;
          top: 62px;
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
            border-color: transparent #ffffff #ffffff transparent;
            border-width: 6px 17px;
            bottom: 0;
          }
        }
      }
      .rt-21 {
        height: 402px;
      }
      .rt-18 {
        height: 422px;
      }
      .rt-20 {
        height: 380px;
      }
      .rt-13 {
        height: 380px;
      }
      .rt-22 {
        height: 380px;
      }
    }
  }
</style>

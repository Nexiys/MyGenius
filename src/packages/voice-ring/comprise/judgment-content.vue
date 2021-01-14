<template>
  <div class="judgment-countdown-wrap">
    <div class="judgment-tips">判断句是否与语篇的意思相符（相符按“ F”键, 不相符按“J”键 ）</div>
    <div class="judgment-content-wrap">
      <timing-ring
        class="countdown"
        :originProgressText="questionData.semantics_judge_time"
        @time-end="timeEndHandle"
      ></timing-ring>
      <div class="judgment-content">
        <div>{{questionData.semantics_judge_content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimingRing from '@/packages/components/timing-ring.vue'

export default {
  name: 'JudgmentContent',
  props: {
    questionData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    TimingRing
  },
  methods: {
    timeEndHandle () {
      this.$emit('time-end-handle')
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
      .countdown {
        position: absolute;
        top: -50px;
        left: 50%;
        margin-left: -50px;
        font-size: 0;
      }
      .judgment-content {
        max-width: 944px;
        line-height: 45px;
        font-size: 26px;
        color: #33363E;
      }
    }
  }
</style>

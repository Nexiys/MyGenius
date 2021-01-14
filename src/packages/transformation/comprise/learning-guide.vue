<template>
  <div class="learning-guide-wrap">
    <div class="guide-tips">任务{{status === 'repeat' ? '重复' : '转换'}}序列</div>
    <div class="judgment-content-wrap">
      <timing-ring
        class="countdown"
        :originProgressText="interval"
        @time-end="timeEndHandle"
      ></timing-ring>
      <div class="judgment-content">
        <div>{{status === 'repeat' ? '接下来屏幕中出现一组任务（连续判断数或词）' : '接下来屏幕中出现一组任务（随机判断数或词）'}}</div>
        <div>请按照题目要求判断并在键盘上按“←”键或“→”键</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimingRing from '@/packages/components/timing-ring.vue'

export default {
  name: 'LearningGuide',
  props: {
    status: {
      type: String,
      default: 'repeat'
    },
    interval: {
      type: Number,
      default: 1
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
  .learning-guide-wrap {
    text-align: center;
    .guide-tips {
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
      .word {
        max-width: 944px;
        line-height: 45px;
        font-size: 26px;
        color: #33363E;
      }
      .red-box {
        line-height: 56px;
        font-size: 56px;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }
  }
</style>

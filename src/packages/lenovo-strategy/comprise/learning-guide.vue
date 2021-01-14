<template>
  <div class="learning-guide-wrap">
    <!-- 倒计时 -->
    <timing-ring
      v-if="time"
      class="countdown"
      :originProgressText="time"
      @time-end="timeEndHandle"
    ></timing-ring>
    <!-- 卡片 -->
    <div
      v-for="(content, index) in resultList"
      :key="index"
    >
      <learning-card
        v-show="index === curPage"
        v-for="(item, index1) in content"
        :key="index1"
        :cardData="item"
      ></learning-card>
    </div>
    <!-- 左右按钮 -->
    <div
      :class="['semicircle', 'left-btn', curPage === 0 ? 'unable' : 'nomal']"
      @click="leftClickHandle"
    >
      <i class="icon-left icon-page-left"></i>
    </div>
    <ul class="dot-box">
      <li
        :class="['dot', {'active': index === curPage}]"
        v-for="(content, index) in resultList"
        :key="index"
      ></li>
    </ul>
    <!-- 底部进度按钮 -->
    <div
      :class="['semicircle', 'right-btn', (curPage + 1) >= total ? 'unable' : 'nomal']"
      @click="rightClickHandle"
    >
      <i class="icon-right icon-page-right"></i>
    </div>
  </div>
</template>

<script>
import LearningCard from './learning-card.vue'
import TimingRing from './timing-ring.vue'

export default {
  name: 'LearningGuide',
  props: {
    contentList: {
      type: Array,
      default () {
        return []
      }
    },
    time: {
      type: Number,
      default: 0
    }
  },
  components: {
    LearningCard,
    TimingRing
  },
  computed: {
    resultList () {
      const n = 2
      return Array.from(Array(Math.ceil(this.contentList.length / 2)))
        .map((item, i) => this.contentList.slice(i * n, (i + 1) * n))
    },
    total () {
      return this.resultList.length
    }
  },
  data () {
    return {
      curPage: 0
    }
  },
  methods: {
    // 左侧切页按钮
    leftClickHandle () {
      if (this.curPage === 0) {
        return
      }
      this.curPage -= 1
    },
    // 右侧切页按钮
    rightClickHandle () {
      if ((this.curPage + 1) >= this.total) {
        return
      }
      this.curPage += 1
    },
    // 倒计时结束
    timeEndHandle () {
      this.$emit('learning-guide-handle')
    }
  }
}
</script>

<style lang="less" scoped>
  .learning-guide-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 48px 0 12px;
    .countdown {
      position: absolute;
      top: 16px;
      right: 16px;
    }
    .semicircle {
      position: absolute;
      top: 50%;
      margin-top: -50px;
      width: 50px;
      height: 100px;
      line-height: 100px;
      font-size: 25px;
      border-radius: 0 100px 100px 0;
      background: rgba(255, 255, 255, 0.9);
    }
    .icon-left {
      position: absolute;
      top: 35px;
      left: 1px;
      font-size: 30px;
    }
    .icon-right {
      position: absolute;
      top: 35px;
      right: 1px;
      font-size: 30px;
    }
    .left-btn {
      left: 0;
      border-radius: 0 100px 100px 0;
    }
    .right-btn {
      right: 0;
      border-radius: 100px 0 0 100px;
    }
    .nomal {
      color: #47A1FE;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      &:active {
        background: rgba(71,161,254, 0.9);
        color: #FFFFFF;
      }
      &:hover {
        background: rgba(71,161,254, 0.9);
        color: #FFFFFF;
      }
    }
    .unable {
      color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.2);
      cursor: not-allowed;
    }
    .dot-box {
      width: 100%;
      position: absolute;
      bottom: 16px;
      .dot {
        margin-right: 12px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background: rgba(255, 255, 255, 0.6);
        &:last-child {
          margin-right: 0;
        }
      }
      .active {
        background: #ffffff;
      }
    }
  }

</style>

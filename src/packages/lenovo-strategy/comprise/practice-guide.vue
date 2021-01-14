<template>
  <div class="practice-guide-wrap">
    <div
      v-for="(list, index) in contentList"
      :key="index"
    >
      <div v-if="index === curPage">
        <timing-ring
          class="countdown"
          :originProgressText="list.remember_time"
          @time-end="timeEndHandle"
        ></timing-ring>
        <div v-if="index === 0">
          <learning-card
            v-for="(item, index1) in list.data"
            :key="index1"
            :cardData="item"
          ></learning-card>
        </div>
        <div v-if="index === 1">
          <card-two
            v-for="(item, index1) in list.data"
            :key="index1"
            :cardData="item"
          ></card-two>
        </div>
        <div v-if="index === 2">
          <card-three
            v-for="(item, index1) in list.data"
            :key="index1"
            :cardData="item"
          ></card-three>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LearningCard from './learning-card.vue'
import CardTwo from './learning-card-two.vue'
import CardThree from './learning-card-three.vue'
import TimingRing from './timing-ring.vue'

export default {
  name: 'practice-guide',
  props: {
    contentList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    LearningCard,
    CardTwo,
    CardThree,
    TimingRing
  },
  data () {
    return {
      curPage: 0
    }
  },
  methods: {
    timeEndHandle () {
      this.curPage += 1

      if (this.curPage === this.contentList.length) {
        this.$emit('practice-guide-handle')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .practice-guide-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 48px 0 12px;
    .countdown {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
</style>

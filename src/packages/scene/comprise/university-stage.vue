<template>
  <div class="university-stage-wrap">
    <div class="university-stage-container">
      <scene-intro
        v-if="currentData&&currentData.template==='intro'"
        :selectData="currentData"
        @intro-complete="nextPage"
      ></scene-intro>
      <order-select
        v-if="currentData&&currentData.template==='check'"
        :selectBg="currentData.background"
        :tipsContent="currentData.content"
        :optionDataList="currentData.option"
        :answerNum="currentData.select_num"
        :answerId="currentData.num"
        @click-button-handle="saveAnswerHandle"
      ></order-select>
      <scene-dialog
        v-if="currentData&&currentData.template === 'dialog'"
        :dialogContent="currentData.content"
        :dialogBg="currentData.background"
        @click-change-handle="nextPage"
      ></scene-dialog>
    </div>
  </div>
</template>

<script>
import SceneIntro from './scene-intro.vue'
import OrderSelect from './order-select.vue'
import SceneDialog from './scene-dialog.vue'

export default {
  name: 'UniversityStage',
  components: {
    SceneIntro,
    OrderSelect,
    SceneDialog
  },
  props: {
    stageData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    currentData () {
      const data = this.stageData.filter((data, index) => {
        return index === this.currentIndex
      })
      return data[0]
    }
  },
  methods: {
    saveAnswerHandle (data) {
      this.$emit('save-answer-data', 'university', this.currentData.num, data)
      this.nextPage()
    },
    nextPage () {
      const length = this.stageData.length - 1
      if (this.currentIndex === length) {
        this.$emit('stage-complete-handle')
      }
      this.currentIndex += 1
    }
  }
}
</script>

<style lang="less" scoped>
  .university-stage-wrap {
    width: 100%;
    height: 100%;
    text-align: center;
    .university-stage-container {
      width: 100%;
      height: 100%;
    }
  }
</style>

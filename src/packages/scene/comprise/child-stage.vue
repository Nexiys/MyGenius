<template>
  <div class="child-stage-wrap">
    <div
      class="child-stage-container"
      v-show="index === currentIndex"
      v-for="(data, index) in stageData"
      :key="index"
    >
      <scene-dialog
        v-if="index === currentIndex&&data.template === 'dialog'"
        :dialogContent="data.content"
        :dialogBg="data.background"
        @click-change-handle="nextPage"
      ></scene-dialog>
      <radio-select
        v-if="data.template === 'radio'|| data.template === 'click'"
        :tipsContent="data.content"
        :optionData="data.option"
        :dialogBg="data.background"
        :answerNum="data.select_num"
        :answerId="data.num"
        @click-change-handle="saveAnswerHandle"
      ></radio-select>
    </div>
  </div>
</template>

<script>
import SceneDialog from './scene-dialog.vue'
import RadioSelect from './radio-select.vue'

export default {
  name: 'ChildStage',
  props: {
    stageData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    SceneDialog,
    RadioSelect
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    saveAnswerHandle (data) {
      this.$emit('save-answer-data', 'child', this.stageData[this.currentIndex].num, data)
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
  .child-stage-wrap {
    width: 100%;
    height: 100%;
    .child-stage-container {
      width: 100%;
      height: 100%;
    }
  }
</style>

<template>
  <div class="immigrant-stage-wrap">
    <div
      class="immigrant-stage-container"
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
      <evaluation
        v-if="data.template === 'judage'"
        :tipsContent="data.content"
        :optionData="data.option"
        :dialogBg="data.background"
        :answerId="data.num"
        @click-change-handle="saveAnswerHandle"
      ></evaluation>
      <radio-select
        v-if="data.template === 'click'"
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
import Evaluation from './evaluation.vue'
import RadioSelect from './immigrant-radio-select.vue'

export default {
  name: 'ImmigrantStage',
  components: {
    SceneDialog,
    Evaluation,
    RadioSelect
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
  methods: {
    saveAnswerHandle (data) {
      this.$emit('save-answer-data', 'immigrant', this.stageData[this.currentIndex].num, data)
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
  .immigrant-stage-wrap {
    width: 100%;
    height: 100%;
    text-align: center;
    .immigrant-stage-container {
      width: 100%;
      height: 100%;
    }
  }
</style>

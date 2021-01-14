<template>
  <div class="scene-wrap">
    <div class="scene-content-wrap">
      <university-stage
        v-if="progressStatus === 1"
        :stageData="universityData"
        @save-answer-data="answerDataHandle"
        @stage-complete-handle="progressStatusHandle"
      ></university-stage>
      <child-stage
        v-if="progressStatus === 2"
        :stageData="childData"
        @save-answer-data="answerDataHandle"
        @stage-complete-handle="progressStatusHandle"
      ></child-stage>
      <immigrant-stage
        v-if="progressStatus === 3"
        :stageData="immigrantData"
        @save-answer-data="answerDataHandle"
        @stage-complete-handle="progressStatusHandle"
      ></immigrant-stage>
    </div>
  </div>
</template>

<script>
import Service from '@/api'
import UniversityStage from './comprise/university-stage.vue'
import ChildStage from './comprise/child-stage.vue'
import ImmigrantStage from './comprise/immigrant-stage.vue'

export default {
  name: 'Scene',
  components: {
    UniversityStage,
    ChildStage,
    ImmigrantStage
  },
  data () {
    return {
      progressStatus: 1, // 1: 大学，2: 孩子，3: 移民
      universityData: [],
      childData: [],
      immigrantData: [],
      answerData: {
        university: {
          university_1: [],
          university_2: [],
          university_3: [],
          university_4: []
        },
        child: {
          child_1: [],
          child_2: [],
          child_3: []
        },
        immigrant: {
          immigrant_1: [],
          immigrant_2: [],
          immigrant_3: []
        }
      }
    }
  },
  created () {
    // 初始化题目信息
    this.initQuestionData()
  },
  methods: {
    // 获取场景数据
    initQuestionData () {
      Service.scene().then(data => {
        this.universityData = data.university
        this.childData = data.child
        this.immigrantData = data.immigrant
      })
    },
    // 提交作答数据
    submitAnswerData () {
      Service.scene_submit({
        data: this.answerData
      }).then(data => {
        if (data.code === 200) {
          this.$emit('enter-next-question')
        }
      })
    },
    // 作答数据处理
    answerDataHandle (stage, number, data) {
      this.answerData[stage][number] = data
    },
    progressStatusHandle () {
      if (this.progressStatus === 3) {
        this.submitAnswerData()
      } else {
        this.progressStatus += 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .scene-wrap {
    padding: 30px;
    font-size: 0;
    .scene-content-wrap {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>

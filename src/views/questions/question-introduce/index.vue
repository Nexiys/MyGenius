<template>
  <component :is="currentTabComponent" />
</template>

<script>
import VoiceRing from './voice-ring'
import Transformation from './transformation'
import VisionSpace from './vision-space'
import LenovoStrategy from './lenovo-strategy'
import Scene from './scene'

export default {
  name: 'QuestionIntroduce',
  components: {
    VoiceRing,
    Transformation,
    VisionSpace,
    LenovoStrategy,
    Scene
  },
  props: {
    type: {
      type: Number,
      default: 13
    }
  },
  data () {
    return {
      questionTypeMap: {
        13: 'LenovoStrategy',
        18: 'Transformation',
        20: 'VisionSpace',
        21: 'VoiceRing',
        22: 'Scene'
      }
    }
  },
  computed: {
    // 当前展示的组件
    currentTabComponent () {
      return this.questionTypeMap[this.type]
    }
  }
}
</script>

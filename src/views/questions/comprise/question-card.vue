<template>
  <component
    :is="currentTabComponent"
    @enter-next-question="enterNextQuestion"/>
</template>

<script>
import VoiceRing from '@/packages/voice-ring'
import Transformation from '@/packages/transformation'
import VisionSpace from '@/packages/vision-space'
import LenovoStrategy from '@/packages/lenovo-strategy'
import Scene from '@/packages/scene'

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
  },
  methods: {
    enterNextQuestion () {
      this.$emit('enter-next-question')
    }
  }
}
</script>

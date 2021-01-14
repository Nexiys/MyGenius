<template>
  <div class="lattice9-wrap">
    <div
      v-for="item in latticeList"
      :key="item.number">
      <div
        :ref="'lattice' + item.number"
        :class="['lattice', 'p' + item.number, {'active': item.selected}]"
      ></div>
      <div :class="['p' + item.number, {'bubble': item.selected}]" :ref="'bubble' + item.number"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lattice9',
  props: {
    answerList: {
      type: Array,
      default () {
        return []
      }
    },
    contentList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      latticeList: [
        { number: 1, selected: false },
        { number: 2, selected: false },
        { number: 3, selected: false },
        { number: 4, selected: false },
        { number: 5, selected: false },
        { number: 6, selected: false },
        { number: 7, selected: false },
        { number: 8, selected: false },
        { number: 9, selected: false }
      ]
    }
  },
  created () {
    setTimeout(() => {
      this.executeAnimation()
    }, 1000)
  },
  methods: {
    executeAnimation () {
      this.showAnswerLattice(this.removeClass)
    },
    showAnswerLattice (callback) {
      const that = this
      for (let j = 0; j < that.answerList.length; j++) {
        const answer = that.answerList[j]
        setTimeout(() => {
          that.$refs['lattice' + answer][0] && that.$refs['lattice' + answer][0].classList.add('active')
          that.$refs['bubble' + answer][0] && that.$refs['bubble' + answer][0].classList.add('bubble')
          callback(answer)
        }, j * 600)
      }
    },
    removeClass (index) {
      const that = this
      setTimeout(() => {
        that.$refs['lattice' + index][0] && that.$refs['lattice' + index][0].classList.remove('active')
        that.$refs['bubble' + index][0] && that.$refs['bubble' + index][0].classList.remove('bubble')
        if (index === that.answerList[that.answerList.length - 1]) {
          setTimeout(() => {
            this.$emit('show-complete')
          }, 600)
        }
      }, 600)
    }
  }
}
</script>

<style lang="less" scoped>
  .lattice9-wrap {
    position: relative;
    margin: 0 auto;
    width: 540px;
    height: 358px;
    border: 1px solid #C3CEDE;
    .lattice {
      position: absolute;
      width: 36px;
      height: 36px;
      background: #C3CEDE;
      z-index: 2;
    }
    .active {
      background: #47A1FE;
    }
    .p1 {
      top: 40px;
      left: 100px;
    }
    .p2 {
      top: 111px;
      left: 156px;
    }
    .p3 {
      top: 80px;
      left: 254px;
    }
    .p4 {
      top: 107px;
      left: 403px;
    }
    .p5 {
      top: 193px;
      left: 454px;
    }
    .p6 {
      top: 175px;
      left: 320px;
    }
    .p7 {
      top: 257px;
      left: 291px;
    }
    .p8 {
      top: 282px;
      left: 164px;
    }
    .p9 {
      top: 206px;
      left: 50px;
    }
  }
  .bubble {
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #daecff;
    z-index: 1;
    animation: flashing 0.6s ease-out;
  }
  @keyframes flashing {
    0% {
      transform: scale(1.4);
      opacity: 1;
    }

    30% {
      opacity: 1;
    }

    100% {
      transform: scale(2);
      opacity: 1;
    }
  }
</style>

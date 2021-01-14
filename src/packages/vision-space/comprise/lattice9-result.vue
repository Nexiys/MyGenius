<template>
  <div class="lattice9-wrap" id="lattice9-result-workspace">
    <div
      v-for="item in latticeList"
      :key="item.number">
      <div
        :id="'lattice-result' + item.number"
        :class="[
          'lattice',
          'p' + item.number,
          { 'isRight': isRight && item.isRight },
          { 'active':  !isRight && item.isRight && item.selected },
          { 'isWrong':  !isRight && !item.isRight && item.selected }
        ]"
      ></div>
      <div
        :class="[
          'p' + item.number,
          'bubble',
          { 'right-bubble': isRight && item.isRight },
          { 'active-bubble':  !isRight && item.isRight && item.selected },
          { 'wrong-bubble':  !isRight && !item.isRight && item.selected }
        ]"
      ></div>
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
    currentAnswer: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      latticeList: [
        { number: 1, selected: false, isRight: false },
        { number: 2, selected: false, isRight: false },
        { number: 3, selected: false, isRight: false },
        { number: 4, selected: false, isRight: false },
        { number: 5, selected: false, isRight: false },
        { number: 6, selected: false, isRight: false },
        { number: 7, selected: false, isRight: false },
        { number: 8, selected: false, isRight: false },
        { number: 9, selected: false, isRight: false }
      ],
      isRight: false,
      jsPlumb: null,
      connList: []
    }
  },
  created () {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: 'lattice9-result-workspace', // 选择器id
      EndpointStyle: { radius: 4, fill: '#47A1FE' },
      Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：折线，流程等
      Anchor: [0.5, 0.5, 0.5, 0.5]
    })
    this.$nextTick(() => {
      this.initData()
    })
  },
  methods: {
    initData () {
      if (this.answerList.toString() === this.currentAnswer.toString()) {
        this.isRight = true
        for (let i = 0; i < this.answerList.length; i++) {
          if (this.answerList[i + 1]) {
            this.connList[i] = {
              sourceNodeId: 'lattice-result' + this.answerList[i],
              targetNodeId: 'lattice-result' + this.answerList[i + 1],
              isRight: true
            }
          }
          this.$set(this.latticeList[this.answerList[i] - 1], 'isRight', true)
        }
      } else {
        this.isRight = false
        this.answerList.forEach((value, index) => {
          if (this.answerList[index + 1]) {
            this.connList[index] = {
              sourceNodeId: 'lattice-result' + this.answerList[index],
              targetNodeId: 'lattice-result' + this.answerList[index + 1],
              isRight: this.answerList[index] === this.currentAnswer[index]
            }
          }
          this.$set(this.latticeList[this.answerList[index] - 1], 'selected', true)
          this.$set(this.latticeList[this.answerList[index] - 1], 'isRight', this.answerList[index] === this.currentAnswer[index])
        })
      }
      this.connectionAll()
    },
    // 创建连接线
    connectionAll () {
      const ins = this.jsPlumb
      ins.ready(() => { // 入口
        for (let i = 0; i < this.connList.length; i++) {
          const conn = this.connList[i]
          let connectionColor = '#47A1FE'
          if (this.isRight) {
            connectionColor = '#29C73E'
          } else {
            connectionColor = conn.isRight ? '#47A1FE' : '#ED5C52'
          }
          const connection = ins.connect({
            source: conn.sourceNodeId,
            target: conn.targetNodeId
          })
          connection.setPaintStyle({ stroke: connectionColor, strokeWidth: 2 })
        }
      })
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
      z-index: 4;
    }
    .isRight {
      background: #29C73E;
      z-index: 4;
    }
    .isWrong {
      background: #ED5C52;
      z-index: 4;
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
    /deep/ svg {
      z-index: 3;
    }
  }
  .bubble {
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transform: scale(2);
    z-index: 1;
  }
  .active-bubble {
    background: #daecff;
  }
  .right-bubble {
    background: #d3f4d9;
  }
  .wrong-bubble {
    background: #fbdfdd;
  }
</style>

<template>
  <div class="lattice25-wrap" id="lattice25-workspace">
    <div
      class="lattice-box"
      :key="item.number"
      v-for="item in latticeList"
    >
      <div
        :id="'lattice25-result' + item.number"
        :ref="'lattice' + item.number"
        :class="[
          'lattice',
          { 'isRight': isRight && item.isRight },
          { 'active':  !isRight && item.isRight && item.selected },
          { 'isWrong':  !isRight && !item.isRight && item.selected }
        ]"
      >
        <div
          :class="[
            'bubble',
            { 'right-bubble': isRight && item.isRight },
            { 'active-bubble':  !isRight && item.isRight && item.selected },
            { 'wrong-bubble':  !isRight && !item.isRight && item.selected }
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lattice25',
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
        { number: 9, selected: false, isRight: false },
        { number: 10, selected: false, isRight: false },
        { number: 11, selected: false, isRight: false },
        { number: 12, selected: false, isRight: false },
        { number: 13, selected: false, isRight: false },
        { number: 14, selected: false, isRight: false },
        { number: 15, selected: false, isRight: false },
        { number: 16, selected: false, isRight: false },
        { number: 17, selected: false, isRight: false },
        { number: 18, selected: false, isRight: false },
        { number: 19, selected: false, isRight: false },
        { number: 20, selected: false, isRight: false },
        { number: 21, selected: false, isRight: false },
        { number: 22, selected: false, isRight: false },
        { number: 23, selected: false, isRight: false },
        { number: 24, selected: false, isRight: false },
        { number: 25, selected: false, isRight: false }
      ],
      isRight: false,
      jsPlumb: null,
      connList: []
    }
  },
  created () {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: 'lattice25-workspace', // 选择器id
      EndpointStyle: 'Blank',
      Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：折线，流程等
      Anchor: ['Top', 'Left', 'Bottom', 'Right']
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
              sourceNodeId: 'lattice25-result' + this.answerList[i],
              targetNodeId: 'lattice25-result' + this.answerList[i + 1],
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
              sourceNodeId: 'lattice25-result' + this.answerList[index],
              targetNodeId: 'lattice25-result' + this.answerList[index + 1],
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
            target: conn.targetNodeId,
            overlays: [['Arrow', {
              width: 16,
              length: 12,
              foldback: 1,
              location: 1,
              onnector: ['StateMachine'],
              endpoint: 'Blank',
              paintStyle: {
                stroke: connectionColor,
                fill: connectionColor
              }
            }]]
          })
          connection.setPaintStyle({ stroke: connectionColor, strokeWidth: 2 })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .lattice25-wrap {
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 540px;
    height: 384px;
    border: 1px solid #C3CEDE;
    font-size: 0;
    /deep/ svg {
      z-index: 3;
    }
    .lattice-box {
      // position: relative;
      flex: 0 0 36px;
      margin-top: 34px;
      margin-left: 60px;
      width: 36px;
      height: 36px;
      background: #C3CEDE;
      z-index: 1;
    }
    .lattice {
      // position: relative;
      // top: 0;
      // left: 0;
      width: 36px;
      height: 36px;
      background: #C3CEDE;
      z-index: 3;
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
    .bubble {
      position: sticky;
      // top: 50%;
      // left: 50%;
      // margin-top: -18px;
      // margin-left: -18px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      z-index: -2;
      transform: scale(2);
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
  }
</style>

<template>
  <div class="lattice25-wrap" id="lattice25-workspace">
    <div
      class="lattice-box"
      :key="item"
      v-for="item in totalNum"
    >
      <div
        class="lattice"
        :id="'lattice25-' + item"
        :ref="'lattice' + item"
      >
        <div
          :id="'bubble25-' + item"
          :ref="'bubble' + item"
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
    contentList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      jsPlumb: null,
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
      totalNum: 25,
      connList: []
    }
  },
  created () {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: 'lattice25-workspace', // 选择器id
      EndpointStyle: 'Blank',
      Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：折线，流程等
      Anchor: ['Top', 'Left', 'Bottom', 'Right']
      // Anchor: ['Perimeter', { shape: 'Circle' }]
    })
    this.$nextTick(() => {
      this.initData()
      this.executeAnimation()
    })
  },
  methods: {
    initData () {
      for (let i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i + 1]) {
          this.connList[i] = {
            sourceNodeId: 'lattice25-' + this.answerList[i],
            targetNodeId: 'lattice25-' + this.answerList[i + 1]
          }
        }
      }
    },
    // 创建连接线
    connectionAll () {
      const ins = this.jsPlumb
      ins.ready(() => { // 入口
        for (let i = 0; i < this.connList.length; i++) {
          const conn = this.connList[i]
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
                stroke: '#47A1FE',
                fill: '#47A1FE'
              }
            }]]
          })
          connection.setPaintStyle({ stroke: '#47A1FE', strokeWidth: 2 })
        }
      })
    },
    executeAnimation () {
      setTimeout(() => {
        this.showAnswerLattice()
      }, 1000)
    },
    showAnswerLattice () {
      const that = this
      for (let j = 0; j < that.answerList.length; j++) {
        const answer = that.answerList[j]
        setTimeout(() => {
          that.$refs['lattice' + answer][0] && that.$refs['lattice' + answer][0].classList.add('active')
          that.$refs['bubble' + answer][0] && that.$refs['bubble' + answer][0].classList.add('bubble')
          that.showArrow(j)
          if (answer === this.answerList[this.answerList.length - 1]) {
            setTimeout(() => {
              this.$emit('show-complete')
            }, 600)
          }
        }, j * 1200)
      }
    },
    showArrow (j) {
      const that = this
      setTimeout(() => {
        const ins = that.jsPlumb
        ins.ready(() => { // 入口
          const conn = that.connList[j]
          if (conn) {
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
                  stroke: '#47A1FE',
                  fill: '#47A1FE'
                }
              }]]
            })
            connection.setPaintStyle({ stroke: '#47A1FE', strokeWidth: 2 })
          }
        })
      }, 600)
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
      z-index: 2;
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
      background: #daecff;
      z-index: -2;
      transform: scale(2);
      animation: flashing 0.6s ease-out;
    }
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

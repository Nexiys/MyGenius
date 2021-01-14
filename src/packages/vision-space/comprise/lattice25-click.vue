<template>
  <div class="lattice25-wrap" id="lattice25-click-workspace">
    <div
      class="lattice-box"
      :key="item.number"
      v-for="(item, index) in latticeList"
    >
      <div
        :class="['lattice', {'active': item.selected}]"
        :id="'lattice25-' + item.number"
        :ref="'lattice' + item.number"
        @click="clickLattice(index)"
      >
      {{index}}
        <div
          :class="[{'bubble': item.selected}]"
          :id="'bubble25-' + item.number"
          :ref="'bubble' + item.number"
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
      latticeList: [
        { number: 1, selected: false },
        { number: 2, selected: false },
        { number: 3, selected: false },
        { number: 4, selected: false },
        { number: 5, selected: false },
        { number: 6, selected: false },
        { number: 7, selected: false },
        { number: 8, selected: false },
        { number: 9, selected: false },
        { number: 10, selected: false },
        { number: 11, selected: false },
        { number: 12, selected: false },
        { number: 13, selected: false },
        { number: 14, selected: false },
        { number: 15, selected: false },
        { number: 16, selected: false },
        { number: 17, selected: false },
        { number: 18, selected: false },
        { number: 19, selected: false },
        { number: 20, selected: false },
        { number: 21, selected: false },
        { number: 22, selected: false },
        { number: 23, selected: false },
        { number: 24, selected: false },
        { number: 25, selected: false }
      ],
      userAnswer: [],
      jsPlumb: null,
      connList: []
    }
  },
  created () {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: 'lattice25-click-workspace', // 选择器id
      EndpointStyle: 'Blank',
      Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：折线，流程等
      Anchor: ['Top', 'Left', 'Bottom', 'Right']
    })
  },
  methods: {
    clickLattice (num) {
      // 超过答案数量处理
      if (this.userAnswer.length > this.answerList.length) {
        return
      }
      this.userAnswer.push(num + 1)
      this.latticeList[num].selected = true
      for (let i = 0; i < this.userAnswer.length; i++) {
        if (this.userAnswer[i + 1]) {
          this.connList[i] = {
            sourceNodeId: 'lattice25-' + this.userAnswer[i],
            targetNodeId: 'lattice25-' + this.userAnswer[i + 1]
          }
        }
      }
      this.connectionAll()
      // 点击完所有格子之后
      if (this.userAnswer.length === this.answerList.length) {
        const that = this
        setTimeout(() => {
          let isRight = false
          if (that.answerList.toString() === that.userAnswer.toString()) {
            isRight = true
          }
          that.$emit('answer-complete', that.userAnswer, isRight)
        }, 1000)
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
    }
  }
</style>

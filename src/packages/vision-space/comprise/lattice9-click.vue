<template>
  <div class="lattice9-wrap" id="lattice9-workspace">
    <div
      v-for="(item, index) in latticeList"
      :key="item.number">
      <div
        :id="'lattice' + item.number"
        :ref="'lattice' + item.number"
        :class="['lattice', 'p' + item.number, {'active': item.selected}]"
        @click="clickLattice(index)"></div>
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
      ],
      userAnswer: [],
      jsPlumb: null,
      connList: []
    }
  },
  created () {
    this.jsPlumb = this.$jsPlumb.getInstance({
      Container: 'lattice9-workspace', // 选择器id
      EndpointStyle: { radius: 4, fill: '#47A1FE' },
      Connector: ['Straight', { gap: 1 }], // 要使用的默认连接器的类型：折线，流程等
      Anchor: [0.5, 0.5, 0.5, 0.5]
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
            sourceNodeId: 'lattice' + this.userAnswer[i],
            targetNodeId: 'lattice' + this.userAnswer[i + 1]
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
            target: conn.targetNodeId
          })
          connection.setPaintStyle({ stroke: '#47A1FE', strokeWidth: 2 })
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
    background: #daecff;
    transform: scale(2);
    z-index: 1;
  }
</style>

<template>
  <div class="histogram-wrap">
    <div class="histogram-title">{{title}}</div>
    <div :class="['histogram-main', widthValue ? 'width' + widthValue : 'width600']" :id="histogramId"></div>
    <div class="histogram-title">
      <div class="histogram-bottom-score">
        <i
          :class="['icon', 'myScore' + styleId]"
        ></i>
        我的得分
      </div>
      <div class="histogram-bottom-score">
        <i
          :class="['icon', 'avgScore' + styleId]"
        ></i>
        平均得分
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Histogram',
  props: {
    histogramId: {
      type: String,
      default: 'myHistogram'
    },
    title: {
      type: String,
      default: 'myHistogram'
    },
    histogramData: {
      type: Array,
      default () {
        return []
      }
    },
    widthValue: {
      type: String,
      default: ''
    },
    styleId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    indicatorData () {
      const indicatorData = []
      this.histogramData.forEach((item, index) => {
        indicatorData.push(item.name)
      })
      return indicatorData
    },
    seriesData () {
      const seriesData1 = []
      const seriesData2 = []
      this.histogramData.forEach((item, index) => {
        seriesData1.push(item.my_score)
        seriesData2.push(item.avg_score)
      })
      const seriesData = [{
        name: '我的得分',
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: this.strategy[this.styleId].myScore,
            lineStyle: {
              width: 1,
              color: this.strategy[this.styleId].myScore
            }
          }
        },
        data: seriesData1
      }, {
        name: '平均分数',
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          normal: {
            color: this.strategy[this.styleId].avgScore,
            lineStyle: {
              width: 1,
              color: this.strategy[this.styleId].avgScore
            }
          }
        },
        data: seriesData2
      }]
      return seriesData
    }
  },
  data () {
    return {
      strategy: [{
        myScore: '#9CA3F6',
        avgScore: '#F68D7B'
      }, {
        myScore: '#75B7FF',
        avgScore: '#F68D7B'
      }, {
        myScore: '#FFAD5A',
        avgScore: '#8DCC74'
      }]
    }
  },
  mounted () {
    this.initHistogram()
  },
  methods: {
    initHistogram () {
      const histogram = this.$echarts.init(document.getElementById(this.histogramId))

      histogram.setOption({
        calculable: true,
        grid: {
          left: '0',
          right: '0',
          top: '8',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#848894'
              }
            },
            // x轴的颜色和宽度
            axisLine: {
              lineStyle: {
                color: '#D8E1E8',
                width: 1 // 这里是坐标轴的宽度,可以去掉
              }
            },
            label: {
              textStyle: {
                color: '#848894'
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            data: this.indicatorData
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#D8E1E8',
                type: 'dotted'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#848894'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D8E1E8',
                width: 0 // 这里是坐标轴的宽度,可以去掉
              }
            },
            label: {
              textStyle: {
                color: '#848894'
              }
            }
          }
        ],
        series: this.seriesData
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .histogram-wrap {
    margin-bottom: 24px;
    text-align: center;
    .histogram-title {
      font-size: 14px;
      color: #33363E;
    }
    .histogram-main {
      margin: 24px auto 20px;
      height: 256px;
    }
    .width600 {
      width: 600px;
    }
    .width329 {
      width: 329px;
    }
    .width368 {
      width: 371px;
    }
    .width371 {
      width: 371px;
    }
    .width453 {
      width: 453px;
    }
    .width535 {
      width: 535px;
    }
    .histogram-bottom-score {
      position: relative;
      display: inline-block;
      padding-left: 16px;
      margin-right: 30px;
      font-size: 12px;
      line-height: 14px;
      color: #565A66;
      &:last-child {
        margin-right: 0;
      }
      .icon {
        position: absolute;
        left: 0;
        top: 3px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 100%;
      }
    }
    .myScore0 {
      background: #9CA3F6;
    }
    .avgScore0 {
      background: #F68D7B;
    }
    .myScore1 {
      background: #75B7FF;
    }
    .avgScore1 {
      background: #F68D7B;
    }
    .myScore2 {
      background: #FFAD5A;
    }
    .avgScore2 {
      background: #8DCC74;
    }
  }
</style>

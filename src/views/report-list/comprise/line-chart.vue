<template>
  <div class="line-chart-wrap">
    <div class="left">
      <div class="line-chart-title" v-if="title">{{title}}</div>
      <div class="line-chart-main" :id="lineChartId"></div>
      <div class="line-chart-title">
        <div class="line-chart-bottom-score">
          <i
            :class="['circle', 'myScore' + styleId ]"
          ></i>
          我的得分
        </div>
        <div class="line-chart-bottom-score">
          <i
            :class="['circle', 'avgScore' + styleId]"
          ></i>
          平均得分
        </div>
      </div>
    </div>
    <div class="right">
      <div v-for="data in rightData" :key="data.name">
        <div class="name">
          <i :class="['circle', 'default' + styleId]"></i>
          {{data.name}}
        </div>
        <p>{{data.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    lineChartId: {
      type: String,
      default: 'myLineChartId'
    },
    title: {
      type: String,
      default: ''
    },
    lineChartData: {
      type: Array,
      default () {
        return []
      }
    },
    rightData: {
      type: Array,
      default () {
        return []
      }
    },
    styleId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      strategy: [{
        myScore: '#5AD9DA',
        avgScore: '#F68D7B'
      }, {
        myScore: '#FFAD5A',
        avgScore: '#8DCC74'
      }]
    }
  },
  computed: {
    indicatorData () {
      const indicatorData = []
      this.lineChartData.forEach((item, index) => {
        indicatorData.push(item.name)
      })
      return indicatorData
    },
    seriesData () {
      const seriesData1 = []
      const seriesData2 = []
      this.lineChartData.forEach((item, index) => {
        seriesData1.push(item.my_score)
        seriesData2.push(item.avg_score)
      })
      const seriesData = [{
        name: '我的得分',
        type: 'line',
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: this.strategy[this.styleId].myScore,
            lineStyle: {
              width: 2,
              color: this.strategy[this.styleId].myScore
            }
          }
        },
        data: seriesData1
      }, {
        name: '平均分数',
        type: 'line',
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          normal: {
            color: this.strategy[this.styleId].avgScore,
            lineStyle: {
              width: 2,
              color: this.strategy[this.styleId].avgScore
            }
          }
        },
        data: seriesData2
      }]
      return seriesData
    }
  },
  mounted () {
    this.initLineChar()
  },
  methods: {
    initLineChar () {
      const lineChar = this.$echarts.init(document.getElementById(this.lineChartId))

      lineChar.setOption({
        calculable: true,
        grid: {
          x: '12%',
          y: '7%',
          width: '87%',
          height: '79%'
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
            scale: true,
            max: 10,
            min: 0,
            splitNumber: 5,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#D8E1E8',
                type: 'dotted'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#848894'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#D8E1E8',
                width: 0 // 这里是坐标轴的宽度,可以去掉
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
  .line-chart-wrap {
    padding-left: 56px;
    display: flex;
    align-items: center;
    .left {
      .line-chart-title {
        margin-bottom: 10px;
        font-size: 14px;
        color: #33363E;
        text-align: center;
      }
      .line-chart-main {
        width: 363px;
        height: 242px;
      }
      .line-chart-bottom-score {
        position: relative;
        display: inline-block;
        margin-right: 30px;
        padding-left: 16px;
        font-size: 12px;
        line-height: 14px;
        color: #565A66;
        &:last-child {
          margin-right: 0;
        }
        .circle {
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
        background: #5AD9DA;
      }
      .avgScore0 {
        background: #F68D7B;
      }
      .myScore1 {
        background: #FFAD5A;
      }
      .avgScore1 {
        background: #8DCC74;
      }
    }
    .right {
      margin-left: 60px;
      .name {
        position: relative;
        padding-left: 16px;
        margin-bottom: 10px;
        line-height: 14px;
        font-size: 14px;
        color: #565A66;
        .circle {
          position: absolute;
          left: 0;
          top: 3px;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background: #6BC3FE;
        }
        .default0 {
          background: #6BC3FE;
        }
        .default1 {
          background: #CBD6E5;
        }
      }
      p {
        margin-bottom: 26px;
        padding-left: 18px;
        font-size: 12px;
        line-height: 18px;
        color: #848894;
      }
    }
  }
</style>

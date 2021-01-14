<template>
  <div class="bar-chart-wrap">
    <div class="title">{{title}}</div>
    <div class="bar-chart-main-container">
      <div class="bar-chart-main" :id="barChartId + 'lf'"></div>
      <div class="bar-chart-main" :id="barChartId + 'rt'"></div>
    </div>
    <div class="bar-chart-bottom">
      <i
        :class="['icon', iconColor]"
      ></i>
      我的得分
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    barChartId: {
      type: String,
      default: 'myBarChart'
    },
    title: {
      type: String,
      default: 'myBarChart'
    },
    barChartData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    iconColor: {
      type: String,
      default: 'color1'
    }
  },
  computed: {
    indicatorData () {
      const indicatorData = []
      this.barChartData.forEach((item, bindex) => {
        indicatorData[bindex] = []
        item.forEach((value, index) => {
          indicatorData[bindex][index] = value.name
        })
      })
      return indicatorData
    },
    seriesData () {
      const data = []
      this.barChartData.forEach((item, bindex) => {
        data[bindex] = []
        item.forEach((value, index) => {
          data[bindex][index] = value.my_score
        })
      })
      const seriesData = [{
        name: '左侧数据',
        type: 'bar',
        barWidth: 20,
        showBackground: true,
        backgroundStyle: {
          color: '#E9F0F8'
        },
        itemStyle: {
          normal: {
            color: '#5AD9DA',
            lineStyle: {
              width: 2,
              color: '#5AD9DA'
            }
          }
        },
        data: data[0]
      }, {
        name: '右侧数据',
        type: 'bar',
        barWidth: 20,
        showBackground: true,
        backgroundStyle: {
          color: '#E9F0F8'
        },
        itemStyle: {
          normal: {
            color: '#5AD9DA',
            lineStyle: {
              width: 2,
              color: '#5AD9DA'
            }
          }
        },
        data: data[1]
      }]
      return seriesData
    }
  },
  mounted () {
    this.initBarChart()
  },
  methods: {
    initBarChart () {
      const barChart1 = this.$echarts.init(document.getElementById(this.barChartId + 'lf'))
      const barChart2 = this.$echarts.init(document.getElementById(this.barChartId + 'rt'))

      barChart1.setOption({
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            inverse: true,
            interval: 2,
            min: 0,
            max: 10,
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
                width: 1 // 这里是坐标轴的宽度,可以去掉
              }
            },
            label: {
              textStyle: {
                color: '#848894'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            inverse: true,
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
            },
            data: this.indicatorData[0]
          },
          {
            type: 'category',
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#D8E1E8',
                width: 1 // 这里是坐标轴的宽度,可以去掉
              }
            }
          }
        ],
        series: this.seriesData[0]
      })
      barChart2.setOption({
        grid: {
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: 10,
            interval: 2,
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
                width: 1 // 这里是坐标轴的宽度,可以去掉
              }
            },
            label: {
              textStyle: {
                color: '#848894'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            position: 'right',
            inverse: true,
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
            },
            data: this.indicatorData[1]
          }, {
            type: 'category',
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#D8E1E8',
                width: 1 // 这里是坐标轴的宽度,可以去掉
              }
            }
          }
        ],
        series: this.seriesData[1]
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .bar-chart-wrap {
    margin-bottom: 30px;
    text-align: center;
    .title {
      font-size: 14px;
      color: #33363E;
    }
    .bar-chart-title {
      font-size: 14px;
      color: #33363E;
    }
    .bar-chart-main-container {
      margin: 24px auto 20px;
      display: flex;
      justify-content: center;
    }
    .bar-chart-main {
      width: 367px;
      height: 225px;
    }
    .bar-chart-bottom {
      position: relative;
      display: inline-block;
      padding-left: 16px;
      font-size: 12px;
      line-height: 14px;
      color: #565A66;
      .icon {
        position: absolute;
        left: 0;
        top: 3px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background: #5AD9DA;
      }
    }
  }
</style>

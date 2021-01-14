<template>
  <div class="progress-double-wrap">
    <div class="progress-double-main-container">
      <!-- 左侧容器 -->
      <div class="progress-double-main" :id="progressId + 'lf'"></div>
      <!-- 右侧容器 -->
      <div class="progress-double-main" :id="progressId + 'rt'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressDouble',
  props: {
    progressId: {
      type: String,
      default: 'myProgress'
    },
    progressData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  computed: {
    indicatorData () {
      const indicatorData = []
      this.progressData.forEach((item, bindex) => {
        indicatorData[bindex] = [item.name]
      })
      return indicatorData
    },
    seriesData () {
      const data = []
      this.progressData.forEach((item, bindex) => {
        data[bindex] = [item.score]
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
        label: {
          normal: {
            show: data[0][0] > 0,
            position: 'left',
            offset: [22, 0],
            padding: [10, 14],
            fontSize: 14,
            borderRadius: [28, 28, 28, 28],
            color: '#fff',
            backgroundColor: '#5AD9DA'
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
        label: {
          normal: {
            show: data[1][0] > 0,
            position: 'right',
            offset: [-22, 0],
            padding: [10, 14],
            fontSize: 14,
            borderRadius: [28, 28, 28, 28],
            color: '#fff',
            backgroundColor: '#5AD9DA'
          }
        },
        data: data[1]
      }]
      return seriesData
    }
  },
  mounted () {
    this.initProgressDouble()
  },
  methods: {
    initProgressDouble () {
      const myProgress1 = this.$echarts.init(document.getElementById(this.progressId + 'lf'))
      const myProgress2 = this.$echarts.init(document.getElementById(this.progressId + 'rt'))

      myProgress1.setOption({
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
              show: false
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
      myProgress2.setOption({
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
              show: false
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
  .progress-double-wrap {
    margin-left: 36px;
    margin-bottom: 20px;
    width: 856px;
    border: 1px solid #D8E1E8;
    .progress-double-main-container {
      padding: 26px 0;
      width: 856px;
      display: flex;
      justify-content: center;
    }
    .progress-double-main {
      width: 374px;
      height: 67px;
    }
  }
</style>

<template>
  <div class="radar-map-wrap">
    <div class="title">{{title}}</div>
    <div class="radar-map-main" id="myRadarMap"></div>
    <div class="radar-map-bottom">
      <div class="radar-map-bottom-score">
        <i
          :class="['icon', 'myScore' + styleId]"
        ></i>
        我的得分
      </div>
      <div class="radar-map-bottom-score" v-if="!isSingle">
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
  name: 'RadarMap',
  props: {
    title: {
      type: String,
      default: 'myRadarMap'
    },
    radarData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    isSingle: {
      type: Boolean,
      default: false
    },
    styleId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      strategy: [{
        myScore: '#5AD9DA'
      }, {
        myScore: '#75B7FF',
        avgScore: '#F68D7B'
      }, {
        myScore: '#FFAD5A',
        avgScore: '#8DCC74'
      }, {
        myScore: '#F68D7B'
      }],
      axisLabelData: ['情绪能力', '工作记忆', '注意能力', '艺术型A']
    }
  },
  computed: {
    indicatorData () {
      const indicatorData = []
      this.radarData.forEach((item, index) => {
        const data = {
          name: item.name,
          axisLabel: {
            show: item.name === this.axisLabelData[this.styleId]
          },
          max: 12
        }
        indicatorData.push(data)
      })
      return indicatorData
    },
    seriesData () {
      const seriesData1 = []
      const seriesData2 = []
      let seriesData = []
      this.radarData.forEach((item, index) => {
        seriesData1.push(item.my_score)
        if (!this.isSingle) {
          seriesData2.push(item.avg_score)
        }
      })
      if (!this.isSingle) {
        seriesData = [{
          name: this.title,
          type: 'radar',
          symbol: 'circle',
          symbolSize: 6,
          areaStyle: {
            normal: {
              width: 1,
              opacity: 0.12
            }
          },
          data: [{
            itemStyle: {
              normal: {
                color: this.strategy[this.styleId].myScore,
                lineStyle: {
                  width: 1,
                  color: this.strategy[this.styleId].myScore
                }
              }
            },
            value: seriesData1,
            name: '我的得分'
          }, {
            itemStyle: {
              normal: {
                color: this.strategy[this.styleId].avgScore,
                lineStyle: {
                  width: 1,
                  color: this.strategy[this.styleId].avgScore
                }
              }
            },
            value: seriesData2,
            name: '平均得分'
          }]
        }]
      } else {
        seriesData = [{
          name: this.title,
          type: 'radar',
          symbol: 'circle',
          symbolSize: 6,
          areaStyle: {
            normal: {
              width: 1,
              opacity: 0.12
            }
          },
          data: [{
            itemStyle: {
              normal: {
                color: this.strategy[this.styleId].myScore,
                lineStyle: {
                  width: 1,
                  color: this.strategy[this.styleId].myScore
                }
              }
            },
            value: seriesData1,
            name: '我的得分'
          }]
        }]
      }
      return seriesData
    }
  },
  mounted () {
    this.initRadarMap()
  },
  methods: {
    initRadarMap () {
      const radarMap = this.$echarts.init(document.getElementById('myRadarMap'))

      radarMap.setOption({
        radar: {
          name: {
            textStyle: {
              color: '#848894'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#D8E1E8'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#848894',
              fontSize: 12
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#ffffff']
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#D8E1E8'
            }
          },
          indicator: this.indicatorData,
          splitNumber: 3
        },
        series: this.seriesData
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .radar-map-wrap {
    margin-bottom: 24px;
    text-align: center;
    .title {
      font-size: 14px;
      color: #33363E;
    }
    .radar-map-title {
      font-size: 14px;
      color: #33363E;
    }
    .radar-map-main {
      margin: 24px auto 8px;
      width: 500px;
      height: 324px;
    }
    .radar-map-bottom-score {
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
      background: #5AD9DA;
    }
    .avgScore0 {
      background: #5AD9DA;
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
    .myScore3 {
      background: #F68D7B;
    }
  }
</style>

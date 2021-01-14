<template>
  <div class="learning-report-wrap">
    <top
      reportType="3"
      :title="reportData.top.name"
      :description="reportData.top.content"
      :total="reportData.top.right"
    ></top>
    <div class="report-main" v-if="reportStatus === 3">
      <!-- 综合模型 -->
      <div class="report-top-content">
        <sub-title title="综合模型" iconName="icon-report-integrated-model" iconColor="color1"></sub-title>
        <radar-map
          v-if="reportData.integrated_model.detail&&reportData.integrated_model.detail.length>0"
          :title="reportData.integrated_model.title"
          :radarData="reportData.integrated_model.detail"
          :styleId="2"
        ></radar-map>
        <sub-title title="重点标签" iconName="icon-report-label" iconColor="color2"></sub-title>
        <tc-label :tagsList="reportData.tags"></tc-label>
        <sub-title title="整体概述" iconName="icon-report-whole" iconColor="color8"></sub-title>
        <paragraph :content="reportData.overall_overview"></paragraph>
      </div>
      <!-- 学习风格分析analysis_of_learning_style -->
      <block blockTitle="学习风格分析">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.analysis_of_learning_style.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.analysis_of_learning_style.overall_overview.chart.detail&&reportData.analysis_of_learning_style.overall_overview.chart.detail.length>0"
          histogramId="styleHistogram"
          :title="reportData.analysis_of_learning_style.overall_overview.chart.title"
          :histogramData="reportData.analysis_of_learning_style.overall_overview.chart.detail"
          widthValue="371"
          :styleId="2"
        ></histogram>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color2"></sub-title>
        <div v-for="single in reportData.analysis_of_learning_style.single_interpretation" :key="single.name" class="single-block">
          <one-level-title :title="single.name" iconColor="bg2"></one-level-title>
          <paragraph :content="single.content" :mgbtValue="single.detail&&single.detail.length > 0 ? 'mgbt16' : 'mgbt24'"></paragraph>
        </div>
        <sub-title title="优势及劣势" iconName="icon-report-promote" iconColor="color8"></sub-title>
        <div v-for="(item, index) in reportData.analysis_of_learning_style.strengths_and_weaknesses" :key="index">
          <div class="item-name">{{item.name}}</div>
          <div class="detail-flex">
            <label-block class="detail" name="优势" nameColor="bg3" :content="item.advantage" bgValue="block-bg3" wdValue="wd420" htValue="ht128" mgbtValue="mgbt20"></label-block>
            <label-block class="detail" name="劣势" nameColor="bg4" :content="item.inferiority" bgValue="block-bg4" wdValue="wd420" htValue="ht128" mgbtValue="mgbt20"></label-block>
          </div>
        </div>
      </block>
      <!-- 学习策略分析analysis_of_learning_strategies -->
      <block blockTitle="学习策略分析">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.analysis_of_learning_strategies.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.analysis_of_learning_strategies.overall_overview.chart.detail&&reportData.analysis_of_learning_strategies.overall_overview.chart.detail.length>0"
          histogramId="cognitiveHistogram"
          :title="reportData.analysis_of_learning_strategies.overall_overview.chart.title"
          :histogramData="reportData.analysis_of_learning_strategies.overall_overview.chart.detail"
          widthValue="329"
          :styleId="2"
        ></histogram>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color2"></sub-title>
        <div v-for="(interpretation, index) in reportData.analysis_of_learning_strategies.single_interpretation" :key="interpretation.name" class="detail-block">
          <one-level-title :title="interpretation.name" iconColor="bg2"></one-level-title>
          <paragraph :content="interpretation.content" mgbtValue="mgbt24"></paragraph>
          <line-chart
            v-if="interpretation.detail&&interpretation.detail.length>0"
            :lineChartId="'lineChart' + index"
            :lineChartData="interpretation.detail"
            :rightData="interpretation.des"
            :styleId="1"
          ></line-chart>
        </div>
      </block>
      <!-- 学习动力分析analysis_of_learning_motivation -->
      <block blockTitle="学习动力分析">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.analysis_of_learning_motivation.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.analysis_of_learning_motivation.overall_overview.chart.detail&&reportData.analysis_of_learning_strategies.overall_overview.chart.detail.length>0"
          histogramId="motivationHistogram"
          :title="reportData.analysis_of_learning_motivation.overall_overview.chart.title"
          :histogramData="reportData.analysis_of_learning_motivation.overall_overview.chart.detail"
          widthValue="329"
          :styleId="2"
        ></histogram>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color2"></sub-title>
        <div v-for="(interpretation, index) in reportData.analysis_of_learning_motivation.single_interpretation" :key="interpretation.name" class="detail-block">
          <one-level-title :title="interpretation.name" iconColor="bg2"></one-level-title>
          <paragraph :content="interpretation.content" mgbtValue="mgbt24"></paragraph>
          <line-chart
            v-if="interpretation.detail&&interpretation.detail.length>0"
            :lineChartId="'motivationLineChart' + index"
            :lineChartData="interpretation.detail"
            :rightData="interpretation.des"
            :styleId="1"
          ></line-chart>
          <label-block name="存在危机" nameColor="bg4" :content="interpretation.existing_crisis" bgValue="block-bg4"></label-block>
          <label-block name="提升机会" nameColor="bg3" :content="interpretation.promotion_opportunity" bgValue="block-bg3"></label-block>
        </div>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <sub-title title="如何在学习中更好的发挥潜能优势" iconName="icon-report-characteristic" iconColor="color1"></sub-title>
        <paragraph :content="reportData.expert_advice.potential_advantages" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="如何进行潜能提升" iconName="icon-report-ability" iconColor="color8"></sub-title>
        <paragraph :content="reportData.expert_advice.ability_improvement" :isIndent="true"></paragraph>
      </block>
    </div>
    <default-part class="report-main" v-if="reportStatus === 0"></default-part>
    <not-done class="report-main" v-if="reportStatus === 1"></not-done>
    <not-build class="report-main" v-if="reportStatus === 2"></not-build>
  </div>
</template>

<script>
import Service from '@/api'
import Top from './comprise/top.vue'
import TcLabel from './comprise/tc-label.vue'
import Block from './comprise/block.vue'
import SubTitle from './comprise/sub-title.vue'
import OneLevelTitle from './comprise/one-level-title.vue'
import Paragraph from './comprise/paragraph.vue'
import LineChart from './comprise/line-chart.vue'
import Histogram from './comprise/histogram.vue'
import LabelBlock from './comprise/label-block.vue'
import RadarMap from './comprise/radar-map.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'LearningReport',
  components: {
    Top,
    TcLabel,
    Block,
    SubTitle,
    OneLevelTitle,
    Paragraph,
    LineChart,
    Histogram,
    LabelBlock,
    RadarMap,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '学习潜能',
          content: '合理使用自己偏爱的学习模式，有效提高学习效率，达到事半功倍的效果',
          right: '共0页',
          intro: ''
        },
        integrated_model: {
          title: '',
          detail: []
        },
        tags: [],
        overall_overview: '',
        analysis_of_learning_style: {
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          single_interpretation: {},
          strengths_and_weaknesses: []
        },
        analysis_of_learning_strategies: {
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          single_interpretation: []
        },
        analysis_of_learning_motivation: {
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          single_interpretation: []
        },
        expert_advice: {
          potential_advantages: '',
          ability_improvement: ''
        }
      },
      reportStatus: 0,
      total: 0
    }
  },
  created () {
    // 初始化报告信息
    this.initData()
  },
  methods: {
    // 获取整体数据
    initData () {
      Service.learning_report().then(data => {
        this.reportStatus = data.status
        if (this.reportStatus === 3) {
          this.reportData = data.data
          this.total = data.sort.length
          this.$emit('load-complete')
        } else {
          this.$emit('load-no-complete')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .learning-report-wrap {
    height: 100%;
  }
  .item-name {
    margin-bottom: 16px;
    padding-left: 36px;
    font-size: 14px;
    color: #33363E;
  }
  .detail-flex {
    margin-left: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .detail {
      margin-left: 16px;
      flex: 0 0 420px;
      height: 100%;
    }
  }
  .single-block {
    margin-bottom: 24px;
  }
  .detail-block {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
</style>

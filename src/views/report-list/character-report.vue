<template>
  <div class="character-report-wrap">
    <top
      reportType="5"
      :title="reportData.top.name"
      :description="reportData.top.content"
      :total="reportData.top.right"
    ></top>
    <div class="report-main" v-if="reportStatus === 3">
      <!-- 头部内容 -->
      <div class="report-top-content">
        <sub-title title="综合模型" iconName="icon-report-integrated-model" iconColor="color1"></sub-title>
        <paragraph :content="reportData.integrated_model.intro" mgbtValue="mgbt24"></paragraph>
        <bar-chart
          v-if="reportData.integrated_model.chart_1.detail&&reportData.integrated_model.chart_1.detail.length>0"
          barChartId="integratedModel"
          :title="reportData.integrated_model.chart_1.title"
          :barChartData="reportData.integrated_model.chart_1.detail"
        ></bar-chart>
        <radar-map
          v-if="reportData.integrated_model.chart_2.detail&&reportData.integrated_model.chart_2.detail.length>0"
          :title="reportData.integrated_model.chart_2.title"
          :radarData="reportData.integrated_model.chart_2.detail"
          :isSingle="true"
          :styleId="0"
        ></radar-map>
        <sub-title title="重点标签" iconName="icon-report-label" iconColor="color2"></sub-title>
        <tc-label :tagsList="reportData.tags"></tc-label>
        <sub-title title="整体概述" iconName="icon-report-whole" iconColor="color8"></sub-title>
        <paragraph :content="reportData.overall_overview" :isIndent="true"></paragraph>
      </div>
      <!-- 人格特点personality_characteristic -->
      <block blockTitle="人格特点" :rightWord="reportData.personality_characteristic.my_score">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.personality_characteristic.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color2"></sub-title>
        <div v-for="(single, index) in reportData.personality_characteristic.single_interpretation" :key="single.name" class="single-block">
          <one-level-title :title="single.name" :rightWord="single.my_score" iconColor="bg2" mgbtValue="mgbt14"></one-level-title>
          <progress-double
            :progressId="'single' + index"
            :progressData="single.chart"
          ></progress-double>
          <div v-for="item in single.des" :key="item.name" class="detail-block">
            <one-level-title :title="item.name" iconColor="bg9" mgbtValue="mgbt5" fontColor="color9"></one-level-title>
            <paragraph :content="item.content" pdlfValue="pdlf18" fontColor="color9"></paragraph>
          </div>
        </div>
        <sub-title title="人格特点名人" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.personality_characteristic.character_celebrity" mgbtValue="mgbt24"></paragraph>
        <sub-title title="优势及劣势" iconName="icon-report-promote" iconColor="color8"></sub-title>
        <div class="detail-flex">
          <label-block class="detail" v-for="detail in reportData.personality_characteristic.advantage_inferiority" :key="detail.name" :name="detail.name" :nameColor="detail.name === '优势' ? 'bg3' : 'bg4'" :content="detail.content" :bgValue="detail.name === '优势' ? 'block-bg3' : 'block-bg4'" wdValue="wd420" mgbtValue="mgbt0"></label-block>
        </div>
      </block>
      <!-- 情绪特点emotional_characteristic -->
      <block blockTitle="情绪特点">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.emotional_characteristic.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color2"></sub-title>
        <div v-for="(interpretation, index) in reportData.emotional_characteristic.single_interpretation" :key="interpretation.name" class="detail-block">
          <one-level-title :title="interpretation.name" :rightWord="interpretation.my_score" iconColor="bg2"></one-level-title>
          <paragraph :content="interpretation.content" mgbtValue="mgbt24"></paragraph>
          <line-chart
            v-if="interpretation.chart.detail&&interpretation.chart.detail.length>0"
            :lineChartId="'lineChart' + index"
            :title="interpretation.chart.title"
            :lineChartData="interpretation.chart.detail"
            :rightData="interpretation.des"
          ></line-chart>
        </div>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <sub-title title="工作环境倾向" iconName="icon-report-environmental" iconColor="color1"></sub-title>
        <div class="single-block">
          <one-level-title v-for="item in reportData.expert_advice.work_environment" :key="item" :title="item" iconColor="bg1" mgbtValue="mgbt6"></one-level-title>
        </div>
        <sub-title title="发展建议" iconName="icon-report-proposal" iconColor="color2"></sub-title>
        <div class="single-block">
          <one-level-title v-for="suggestion in reportData.expert_advice.development_suggestion" :key="suggestion" :title="suggestion" iconColor="bg2" mgbtValue="mgbt6"></one-level-title>
        </div>
        <sub-title title="各项能力提升" iconName="icon-report-ability" iconColor="color8"></sub-title>
        <div v-for="ability in reportData.expert_advice.ability_improvement" :key="ability.name" class="detail-block">
          <one-level-title :title="ability.name" iconColor="bg8"></one-level-title>
          <paragraph :content="ability.content"></paragraph>
        </div>
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
import Block from './comprise/block.vue'
import SubTitle from './comprise/sub-title.vue'
import Paragraph from './comprise/paragraph.vue'
import OneLevelTitle from './comprise/one-level-title.vue'
import TcLabel from './comprise/tc-label.vue'
import BarChart from './comprise/bar-chart.vue'
import RadarMap from './comprise/radar-map.vue'
import LineChart from './comprise/line-chart.vue'
import LabelBlock from './comprise/label-block.vue'
import ProgressDouble from './comprise/progress-double.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'CharacterReport',
  components: {
    Top,
    Block,
    SubTitle,
    Paragraph,
    OneLevelTitle,
    TcLabel,
    BarChart,
    RadarMap,
    LineChart,
    LabelBlock,
    ProgressDouble,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '性格特点',
          content: '了解人格特征可帮助个人认识自我、接纳自我，促进个人成长与发展',
          right: '共0页',
          intro: ''
        },
        integrated_model: {
          intro: '',
          chart_1: {
            title: '',
            detail: []
          },
          chart_2: {
            title: '',
            detail: []
          }
        },
        tags: [],
        overall_overview: '',
        personality_characteristic: {
          intro: '',
          my_score: '',
          single_interpretation: [],
          character_celebrity: '',
          advantage_inferiority: []
        },
        emotional_characteristic: {
          intro: '',
          single_interpretation: []
        },
        expert_advice: {
          work_environment: [],
          development_suggestion: [],
          ability_improvement: []
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
      Service.character_report().then(data => {
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
  .character-report-wrap {
    height: 100%;
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
      height: 106px;
    }
  }
  .single-block {
    margin-bottom: 24px;
  }
  .detail-block {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
</style>

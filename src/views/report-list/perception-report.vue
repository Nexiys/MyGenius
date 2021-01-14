<template>
  <div class="perception-report-wrap">
    <top
      reportType="2"
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
          :styleId="1"
        ></radar-map>
        <sub-title title="重点标签" iconName="icon-report-label" iconColor="color2"></sub-title>
        <tc-label :tagsList="reportData.tags"></tc-label>
        <sub-title title="整体概述" iconName="icon-report-whole" iconColor="color8"></sub-title>
        <paragraph :content="reportData.overall_overview" :isIndent="true"></paragraph>
      </div>
      <!-- 工作记忆能力working_memory -->
      <block blockTitle="工作记忆能力">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.working_memory.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <paragraph :content="reportData.working_memory.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.working_memory.overall_overview.chart.detail&&reportData.working_memory.overall_overview.chart.detail.length>0"
          histogramId="workingHistogram"
          :title="reportData.working_memory.overall_overview.chart.title"
          :histogramData="reportData.working_memory.overall_overview.chart.detail"
          widthValue="329"
          :styleId="1"
        ></histogram>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <div v-for="item in reportData.working_memory.single_interpretation" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="提升机会" iconName="icon-report-promote" iconColor="color4"></sub-title>
        <paragraph :content="reportData.working_memory.promotion_opportunity"></paragraph>
      </block>
      <!-- 记忆策略运用application_of_memory_strategy -->
      <block blockTitle="记忆策略运用">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.application_of_memory_strategy.intro" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.application_of_memory_strategy.overall_overview.chart.detail&&reportData.application_of_memory_strategy.overall_overview.chart.detail.length>0"
          histogramId="applicationHistogram"
          :title="reportData.application_of_memory_strategy.overall_overview.chart.title"
          :histogramData="reportData.application_of_memory_strategy.overall_overview.chart.detail"
          widthValue="535"
          :styleId="1"
        ></histogram>
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <paragraph :content="reportData.application_of_memory_strategy.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <div v-for="item in reportData.application_of_memory_strategy.single_interpretation" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="提升机会" iconName="icon-report-concept" iconColor="color4"></sub-title>
        <paragraph :content="reportData.application_of_memory_strategy.promotion_opportunity"></paragraph>
      </block>
      <!-- 注意力attention -->
      <block blockTitle="注意力">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.attention.intro" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.attention.overall_overview.chart.detail&&reportData.attention.overall_overview.chart.detail.length>0"
          histogramId="attentionHistogram"
          :title="reportData.attention.overall_overview.chart.title"
          :histogramData="reportData.attention.overall_overview.chart.detail"
          widthValue="453"
          :styleId="1"
        ></histogram>
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <paragraph :content="reportData.attention.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <div v-for="item in reportData.attention.single_interpretation" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="提升机会" iconName="icon-report-concept" iconColor="color4"></sub-title>
        <paragraph :content="reportData.attention.promotion_opportunity"></paragraph>
      </block>
      <!-- 思维能力thinking_ability -->
      <block blockTitle="思维能力">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.thinking_ability.intro" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.thinking_ability.overall_overview.chart.detail&&reportData.thinking_ability.overall_overview.chart.detail.length>0"
          histogramId="thinkingHistogram"
          :title="reportData.thinking_ability.overall_overview.chart.title"
          :histogramData="reportData.thinking_ability.overall_overview.chart.detail"
          widthValue="368"
          :styleId="1"
        ></histogram>
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <paragraph :content="reportData.thinking_ability.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <div v-for="item in reportData.thinking_ability.single_interpretation" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="提升机会" iconName="icon-report-concept" iconColor="color4"></sub-title>
        <paragraph :content="reportData.thinking_ability.promotion_opportunity"></paragraph>
      </block>
      <!-- 反应时reaction_time -->
      <block blockTitle="反应时">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.reaction_time.intro" mgbtValue="mgbt24"></paragraph>
        <histogram
          v-if="reportData.reaction_time.overall_overview.chart.detail&&reportData.reaction_time.overall_overview.chart.detail.length>0"
          histogramId="reactionHistogram"
          :title="reportData.reaction_time.overall_overview.chart.title"
          :histogramData="reportData.reaction_time.overall_overview.chart.detail"
          widthValue="329"
          :styleId="1"
        ></histogram>
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <paragraph :content="reportData.reaction_time.overall_overview.content" mgbtValue="mgbt24"></paragraph>
        <sub-title title="单项解读" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <div v-for="item in reportData.reaction_time.single_interpretation" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="提升机会" iconName="icon-report-concept" iconColor="color4"></sub-title>
        <paragraph :content="reportData.reaction_time.promotion_opportunity"></paragraph>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <sub-title title="认知潜能特点" iconName="icon-report-characteristic" iconColor="color1"></sub-title>
        <paragraph :content="reportData.expert_advice.characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="各项能力提升" iconName="icon-report-ability" iconColor="color8"></sub-title>
        <div v-for="item in reportData.expert_advice.ability_improvement" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
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
import TcLabel from './comprise/tc-label.vue'
import Block from './comprise/block.vue'
import SubTitle from './comprise/sub-title.vue'
import OneLevelTitle from './comprise/one-level-title.vue'
import Paragraph from './comprise/paragraph.vue'
import Histogram from './comprise/histogram.vue'
import RadarMap from './comprise/radar-map.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'PerceptionReport',
  components: {
    Top,
    TcLabel,
    Block,
    SubTitle,
    OneLevelTitle,
    Paragraph,
    Histogram,
    RadarMap,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '认知潜能',
          content: '清楚了解自己在各个潜能方面的优势及不足，并通过训练有针对性的提升',
          right: '共0页',
          intro: ''
        },
        integrated_model: {
          title: '',
          detail: []
        },
        overall_overview: '',
        working_memory: {
          intro: '',
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          promotion_opportunity: '',
          single_interpretation: []
        },
        application_of_memory_strategy: {
          intro: '',
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          promotion_opportunity: '',
          single_interpretation: []
        },
        attention: {
          intro: '',
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          promotion_opportunity: '',
          single_interpretation: []
        },
        thinking_ability: {
          intro: '',
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          promotion_opportunity: '',
          single_interpretation: []
        },
        reaction_time: {
          intro: '',
          overall_overview: {
            content: '',
            chart: {
              title: '',
              detail: []
            }
          },
          promotion_opportunity: '',
          single_interpretation: []
        },
        expert_advice: {
          characteristic: '',
          ability_improvement: {}
        }
      }, // 报告数据
      reportStatus: 0,
      total: 0
    }
  },
  created () {
    // 初始化报告信息
    this.initData()
  },
  methods: {
    initData () {
      Service.perception_report().then(data => {
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
  .perception-report-wrap {
    height: 100%;
    .top-content {
      padding: 24px;
    }
  }
</style>

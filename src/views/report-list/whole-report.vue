<template>
  <div class="whole-report-wrap">
    <top
      reportType="1"
      :title="reportData.top.name"
      :description="reportData.top.content"
      :total="reportData.top.right"
    ></top>
    <div class="report-main" v-if="reportStatus === 3">
      <!-- 整体情况 -->
      <div class="report-top-content">
        <sub-title title="整体情况" iconName="icon-report-integrated-model" iconColor="color1"></sub-title>
        <tag-cloud v-if="reportData.keywords.length>0" :tagListOrg="reportData.keywords"></tag-cloud>
      </div>
      <!-- 认知潜能cognitive_potential -->
      <block blockTitle="认知潜能">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.cognitive_potential.intro" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="综合得分" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <histogram
          v-if="reportData.cognitive_potential.chart.detail&&reportData.cognitive_potential.chart.detail.length>0"
          histogramId="cognitiveHistogram"
          :title="reportData.cognitive_potential.chart.title"
          :histogramData="reportData.cognitive_potential.chart.detail"
          widthValue="453"
        ></histogram>
        <sub-title title="潜能分析" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <paragraph :content="reportData.cognitive_potential.analysis" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="专家建议" iconName="icon-report-promote" iconColor="color4"></sub-title>
        <paragraph :content="reportData.cognitive_potential.suggest" :isIndent="true"></paragraph>
      </block>
      <!-- 学习潜能learning_potential -->
      <block blockTitle="学习潜能">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.learning_potential.intro" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="综合得分" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <histogram
          v-if="reportData.learning_potential.chart.detail&&reportData.learning_potential.chart.detail.length>0"
          histogramId="learningHistogram"
          :title="reportData.learning_potential.chart.title"
          :histogramData="reportData.learning_potential.chart.detail"
          widthValue="329"
        ></histogram>
        <sub-title title="潜能分析" iconName="icon-report-individual" iconColor="color8"></sub-title>
        <div v-for="(analysis, index) in reportData.learning_potential.analysis" :key="index">
          <one-level-title :title="analysis" iconColor="bg8" mgbtValue="mgbt16"></one-level-title>
        </div>
        <sub-title title="专家建议" iconName="icon-report-promote" iconColor="color4"></sub-title>
        <paragraph :content="reportData.learning_potential.suggest" :isIndent="true"></paragraph>
      </block>
      <!-- 兴趣倾向interest_tendency -->
      <block blockTitle="兴趣倾向">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.interest_tendency.intro" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="综合得分" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <histogram
          v-if="reportData.interest_tendency.chart.detail&&reportData.interest_tendency.chart.detail.length>0"
          histogramId="interestHistogram"
          :title="reportData.interest_tendency.chart.title"
          :histogramData="reportData.interest_tendency.chart.detail"
          widthValue="535"
        ></histogram>
        <sub-title title="专家建议" iconName="icon-report-promote" iconColor="color4"></sub-title>
        <paragraph :content="reportData.interest_tendency.suggest" :isIndent="true"></paragraph>
      </block>
      <!-- 性格特点personality_characteristic -->
      <block blockTitle="性格特点">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.personality_characteristic.intro" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="综合得分" iconName="icon-report-summary" iconColor="color2"></sub-title>
        <histogram
          v-if="reportData.personality_characteristic.chart.detail&&reportData.personality_characteristic.chart.detail.length>0"
          histogramId="personalityHistogram"
          :title="reportData.personality_characteristic.chart.title"
          :histogramData="reportData.personality_characteristic.chart.detail"
          widthValue="371"
        ></histogram>
        <sub-title title="性格特点得分" iconName="icon-report-temperament" iconColor="color8"></sub-title>
        <div v-for="analysis in reportData.personality_characteristic.analysis" :key="analysis.name">
          <div class="name">{{analysis.name}}</div>
          <div v-if="analysis.advantage" class="detail-flex">
            <label-block class="detail" name="优势" nameColor="bg3" :content="analysis.advantage" bgValue="block-bg3" wdValue="wd420"></label-block>
            <label-block class="detail" name="劣势" nameColor="bg4" :content="analysis.inferiority" bgValue="block-bg4" wdValue="wd420"></label-block>
          </div>
          <div v-if="analysis.analysis" class="single-block">
            <label-block name="分析" nameColor="bg2" :content="analysis.analysis" bgValue="block-bg2"></label-block>
          </div>
        </div>
        <sub-title title="专家建议" iconName="icon-report-proposal" iconColor="color3"></sub-title>
        <div class="detail-flex">
          <label-block class="detail1"
            v-for="suggest in reportData.personality_characteristic.suggest"
            :key="suggest.name"
            :name="suggest.name"
            nameColor="bg3"
            :content="suggest.content"
            bgValue="block-bg3"
            wdValue="wd420"
            mgbtValue="mgbt0"
          ></label-block>
        </div>
      </block>
      <!-- 学科特点 -->
      <block blockTitle="学科特点">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.discipline_characteristic.intro" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="特点列表" iconName="icon-report-high-school" iconColor="color2"></sub-title>
        <tc-table :rowsData="reportData.discipline_characteristic.feature_list"></tc-table>
      </block>
      <!-- 选科规划select_subject_planning -->
      <block blockTitle="选科规划">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.select_subject_planning.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="模块优势" iconName="icon-report-advantage" iconColor="color3"></sub-title>
        <div v-for="advantage in reportData.select_subject_planning.advantage" :key="advantage.name">
          <one-level-title :title="advantage.name" iconColor="bg3"></one-level-title>
          <paragraph :content="advantage.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="模块盲点" iconName="icon-report-inferiority" iconColor="color4"></sub-title>
        <div v-for="(inferiority, index) in reportData.select_subject_planning.inferiority" :key="inferiority.name+index">
          <one-level-title :title="inferiority.name" iconColor="bg4"></one-level-title>
          <paragraph :content="inferiority.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="专家建议" iconName="icon-report-proposal" iconColor="color8"></sub-title>
        <paragraph :content="reportData.select_subject_planning.suggest" mgbtValue="mgbt20"></paragraph>
        <sub-title title="推荐科目" iconName="icon-report-high-school" iconColor="color2"></sub-title>
        <div v-for="recommended in reportData.select_subject_planning.recommended_subject" :key="recommended.name">
          <one-level-title :title="recommended.name" iconColor="bg2"></one-level-title>
          <paragraph :content="recommended.content" mgbtValue="mgbt20"></paragraph>
        </div>
      </block>
      <!-- 志愿填报fill_aspiration -->
      <block blockTitle="志愿填报">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.fill_aspiration.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="优势维度" iconName="icon-report-advantage" iconColor="color3"></sub-title>
        <div v-for="item in reportData.fill_aspiration.advantage" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg3"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="推荐专业" iconName="icon-report-fit" iconColor="color2"></sub-title>
        <paragraph :content="reportData.fill_aspiration.recommended_subject.content" mgbtValue="mgbt20"></paragraph>
        <div v-for="item in reportData.fill_aspiration.recommended_subject.detail" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg2"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="专业培养" iconName="icon-report-ability" iconColor="color8"></sub-title>
        <paragraph :content="reportData.fill_aspiration.professional_training.content" mgbtValue="mgbt20"></paragraph>
        <div v-for="item in reportData.fill_aspiration.professional_training.detail" :key="item.name" class="detail-block">
          <one-level-title :title="item.name" iconColor="bg8" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 职业发展career_development -->
      <block blockTitle="职业发展">
        <sub-title title="概念介绍" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.career_development.intro" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="优势维度" iconName="icon-report-advantage" iconColor="color3"></sub-title>
        <div v-for="(item, index) in reportData.career_development.advantage" :key="item.name+index">
          <one-level-title :title="item.name" iconColor="bg3"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <sub-title title="专家建议" iconName="icon-report-proposal" iconColor="color8"></sub-title>
        <one-level-title :title="reportData.career_development.suggest.OKR.name" iconColor="bg8"></one-level-title>
        <paragraph :content="reportData.career_development.suggest.OKR.content" mgbtValue="mgbt20"></paragraph>
        <one-level-title :title="reportData.career_development.suggest.recommended_career.name" iconColor="bg8"></one-level-title>
        <div class="single-block">
          <paragraph
            v-for="(content, index) in reportData.career_development.suggest.recommended_career.content"
            :key="index"
            :content="content"
          ></paragraph>
        </div>
        <sub-title title="职业介绍" iconName="icon-report-occupation" iconColor="color2"></sub-title>
        <paragraph :content="reportData.career_development.career_intro.content" mgbtValue="mgbt20"></paragraph>
        <div v-for="(detail, index) in reportData.career_development.career_intro.detail" :key="index" class="detail-block">
          <one-level-title :title="detail.name" iconColor="bg2"></one-level-title>
          <label-block v-for="intro in detail.intro" :key="intro.name" :name="intro.name" nameColor="bg2" :content="intro.content" bgValue="block-bg2"></label-block>
        </div>
      </block>
      <!-- 专家寄语expert_message -->
      <block blockTitle="专家寄语">
        <paragraph :content="reportData.expert_message" :isIndent="true"></paragraph>
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
import LabelBlock from './comprise/label-block.vue'
import TcTable from './comprise/table-three.vue'
import Histogram from './comprise/histogram.vue'
import TagCloud from './comprise/tag-cloud.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'WholeReport',
  components: {
    Top,
    Block,
    SubTitle,
    Paragraph,
    OneLevelTitle,
    LabelBlock,
    Histogram,
    TcTable,
    TagCloud,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '综合分析',
          content: '四大维度多元化分析，反映最真实的自己',
          right: '共0页',
          intro: ''
        },
        keywords: [],
        cognitive_potential: {
          intro: '',
          chart: {
            title: '',
            detail: []
          },
          analysis: '',
          suggest: ''
        },
        learning_potential: {
          intro: '',
          chart: {
            title: '',
            detail: []
          },
          analysis: [],
          suggest: ''
        },
        interest_tendency: {
          intro: '',
          chart: {
            title: '',
            detail: []
          },
          suggest: ''
        },
        personality_characteristic: {
          intro: '',
          chart: {
            title: '',
            detail: []
          },
          analysis: [],
          suggest: []
        },
        discipline_characteristic: {
          intro: '',
          feature_list: []
        },
        select_subject_planning: {
          intro: '',
          advantage: [],
          inferiority: [],
          suggest: '',
          recommended_subject: []
        },
        fill_aspiration: {
          intro: '',
          advantage: [],
          recommended_subject: {
            content: '',
            detail: []
          },
          professional_training: {
            content: '',
            detail: []
          }
        },
        career_development: {
          intro: '',
          advantage: [],
          suggest: {
            OKR: {
              name: '',
              content: ''
            },
            recommended_career: {
              name: '',
              content: []
            }
          },
          career_intro: {
            content: '',
            detail: []
          }
        },
        expert_message: ''
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
      Service.whole_report().then(data => {
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
  .whole-report-wrap {
    height: 100%;
  }
  .name {
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
      height: 106px;
    }
    .detail1 {
      margin-left: 16px;
      flex: 0 0 420px;
      height: 150px;
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

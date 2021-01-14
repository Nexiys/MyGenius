<template>
  <div class="interest-report-wrap">
    <top
      reportType="4"
      :title="reportData.top.name"
      :description="reportData.top.content"
      :total="reportData.top.right"
    ></top>
    <div class="report-main" v-if="reportStatus === 3">
      <!-- 头部内容 -->
      <div class="report-top-content">
        <sub-title title="综合模型" iconName="icon-report-integrated-model" iconColor="color1"></sub-title>
        <radar-map
          v-if="reportData.integrated_model.detail&&reportData.integrated_model.detail.length>0"
          :title="reportData.integrated_model.title"
          :radarData="reportData.integrated_model.detail"
          :isSingle="true"
          :styleId="3"
        ></radar-map>
        <sub-title title="重点标签" iconName="icon-report-label" iconColor="color2"></sub-title>
        <tc-label :tagsList="reportData.tags"></tc-label>
        <sub-title title="整体概述" iconName="icon-report-whole" iconColor="color8"></sub-title>
        <paragraph :content="reportData.overall_overview" :isIndent="true"></paragraph>
      </div>
      <!-- 社会型（S）social_type -->
      <block blockTitle="社会型（S）">
        <sub-title title="我的得分" iconName="icon-report-score" iconColor="color1"></sub-title>
        <progress-bar :firstValue="reportData.social_type.my_score"></progress-bar>
        <sub-title title="类型特点" iconName="icon-report-type" iconColor="color2"></sub-title>
        <paragraph :content="reportData.social_type.type_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="性格特点" iconName="icon-report-character" iconColor="color8"></sub-title>
        <paragraph :content="reportData.social_type.personality_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="职业倾向" iconName="icon-report-occupation" iconColor="color4"></sub-title>
        <div v-for="item in reportData.social_type.career_orientation" :key="item" class="label-block">
          <one-level-title :title="item" iconColor="bg4" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 艺术型（A）art_type -->
      <block blockTitle="艺术型（A）">
        <sub-title title="我的得分" iconName="icon-report-score" iconColor="color1"></sub-title>
        <progress-bar :firstValue="reportData.art_type.my_score"></progress-bar>
        <sub-title title="类型特点" iconName="icon-report-type" iconColor="color2"></sub-title>
        <paragraph :content="reportData.art_type.type_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="性格特点" iconName="icon-report-character" iconColor="color8"></sub-title>
        <paragraph :content="reportData.art_type.personality_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="职业倾向" iconName="icon-report-occupation" iconColor="color4"></sub-title>
        <div v-for="item in reportData.art_type.career_orientation" :key="item" class="label-block">
          <one-level-title :title="item" iconColor="bg4" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 常规型（C）routine_type -->
      <block blockTitle="常规型（C）">
        <sub-title title="我的得分" iconName="icon-report-score" iconColor="color1"></sub-title>
        <progress-bar :firstValue="reportData.routine_type.my_score"></progress-bar>
        <sub-title title="类型特点" iconName="icon-report-type" iconColor="color2"></sub-title>
        <paragraph :content="reportData.routine_type.type_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="性格特点" iconName="icon-report-character" iconColor="color8"></sub-title>
        <paragraph :content="reportData.routine_type.personality_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="职业倾向" iconName="icon-report-occupation" iconColor="color4"></sub-title>
        <div v-for="item in reportData.routine_type.career_orientation" :key="item" class="label-block">
          <one-level-title :title="item" iconColor="bg4" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 现实型（R）reality_type -->
      <block blockTitle="现实型（R）">
        <sub-title title="我的得分" iconName="icon-report-score" iconColor="color1"></sub-title>
        <progress-bar :firstValue="reportData.reality_type.my_score"></progress-bar>
        <sub-title title="类型特点" iconName="icon-report-type" iconColor="color2"></sub-title>
        <paragraph :content="reportData.reality_type.type_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="性格特点" iconName="icon-report-character" iconColor="color8"></sub-title>
        <paragraph :content="reportData.reality_type.personality_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="职业倾向" iconName="icon-report-occupation" iconColor="color4"></sub-title>
        <div v-for="item in reportData.reality_type.career_orientation" :key="item" class="label-block">
          <one-level-title :title="item" iconColor="bg4" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 研究型（I）research_type -->
      <block blockTitle="研究型（I）">
        <sub-title title="我的得分" iconName="icon-report-score" iconColor="color1"></sub-title>
        <progress-bar :firstValue="reportData.research_type.my_score"></progress-bar>
        <sub-title title="类型特点" iconName="icon-report-type" iconColor="color2"></sub-title>
        <paragraph :content="reportData.research_type.type_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="性格特点" iconName="icon-report-character" iconColor="color8"></sub-title>
        <paragraph :content="reportData.research_type.personality_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="职业倾向" iconName="icon-report-occupation" iconColor="color4"></sub-title>
        <div v-for="item in reportData.research_type.career_orientation" :key="item" class="label-block">
          <one-level-title :title="item" iconColor="bg4" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 企业型（E）enterprise_type -->
      <block blockTitle="企业型（E）">
        <sub-title title="我的得分" iconName="icon-report-score" iconColor="color1"></sub-title>
        <progress-bar :firstValue="reportData.enterprise_type.my_score"></progress-bar>
        <sub-title title="类型特点" iconName="icon-report-type" iconColor="color2"></sub-title>
        <paragraph :content="reportData.enterprise_type.type_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="性格特点" iconName="icon-report-character" iconColor="color8"></sub-title>
        <paragraph :content="reportData.enterprise_type.personality_characteristic" mgbtValue="mgbt24"></paragraph>
        <sub-title title="职业倾向" iconName="icon-report-occupation" iconColor="color4"></sub-title>
        <div v-for="item in reportData.enterprise_type.career_orientation" :key="item" class="label-block">
          <one-level-title :title="item" iconColor="bg4" mgbtValue="mgbt0"></one-level-title>
        </div>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <sub-title title="性格特点" iconName="icon-report-characteristic" iconColor="color1"></sub-title>
        <paragraph :content="reportData.expert_advice.personality_characteristic" :isIndent="true" mgbtValue="mgbt24"></paragraph>
        <sub-title title="适合学科和职业" iconName="icon-report-fit" iconColor="color8"></sub-title>
        <paragraph :content="reportData.expert_advice.discipline_occupation.des" :isIndent="true" mgbtValue="mgbt20"></paragraph>
        <div v-for="item in reportData.expert_advice.discipline_occupation.detail" :key="item.name" class="detail-block">
          <one-level-title :title="item.name" iconColor="bg8"></one-level-title>
          <paragraph :content="item.content"></paragraph>
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
import RadarMap from './comprise/radar-map.vue'
import ProgressBar from './comprise/progress-bar.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'InterestReport',
  components: {
    Top,
    RadarMap,
    Block,
    SubTitle,
    Paragraph,
    TcLabel,
    OneLevelTitle,
    ProgressBar,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '兴趣倾向',
          content: '了解自己的兴趣倾向及性格特点，为未来选课、职业道路奠定基础',
          right: '共0页',
          intro: ''
        },
        integrated_model: {
          title: '',
          detail: []
        },
        tags: [],
        overall_overview: '',
        social_type: {
          my_score: 0,
          type_characteristic: '',
          personality_characteristic: '',
          career_orientation: []
        },
        art_type: {
          my_score: 0,
          type_characteristic: '',
          personality_characteristic: '',
          career_orientation: []
        },
        routine_type: {
          my_score: 0,
          type_characteristic: '',
          personality_characteristic: '',
          career_orientation: []
        },
        reality_type: {
          my_score: 0,
          type_characteristic: '',
          personality_characteristic: '',
          career_orientation: []
        },
        research_type: {
          my_score: 0,
          type_characteristic: '',
          personality_characteristic: '',
          career_orientation: []
        },
        enterprise_type: {
          my_score: 0,
          type_characteristic: '',
          personality_characteristic: '',
          career_orientation: []
        },
        expert_advice: {
          personality_characteristic: '',
          discipline_occupation: {
            des: '',
            detail: []
          }
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
      Service.interest_report().then(data => {
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
  .interest-report-wrap {
    height: 100%;
  }
  .step-flex {
    margin-left: 20px;
    margin-bottom: 4px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .step {
      margin-left: 16px;
      margin-bottom: 16px;
      flex: 0 0 420px;
      height: 128px;
    }
  }
  .label-block {
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  .detail-block {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
</style>

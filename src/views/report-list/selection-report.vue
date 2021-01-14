<template>
  <div class="selection-report-wrap">
    <top
      reportType="6"
      :title="reportData.top.name"
      :description="reportData.top.content"
      :total="reportData.top.right"
    ></top>
    <div class="report-main" v-if="reportStatus === 3">
      <!-- 头部内容 -->
      <div class="top-content" v-html="reportData.top.intro"></div>
      <!-- 模块优势module_advantage -->
      <block blockTitle="模块优势">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.module_advantage.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="优势维度" iconName="icon-report-advantage" iconColor="color3"></sub-title>
        <div v-for="advantage in reportData.module_advantage.advantage" :key="advantage.name" class="detail-block">
          <one-level-title :title="advantage.name" :rightWord="advantage.item" iconColor="bg3"></one-level-title>
          <paragraph :content="advantage.content" :mgbtValue="advantage.detail&&advantage.detail.length > 0 ? 'mgbt16' : ''"></paragraph>
          <label-block v-for="(item, index) in advantage.detail" :key="item.name + index" :name="item.name" nameColor="bg3" :content="item.content" bgValue="block-bg3"></label-block>
        </div>
      </block>
      <!-- 模块盲点module_inferiority -->
      <block blockTitle="模块盲点">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.module_inferiority.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="盲点维度" iconName="icon-report-inferiority" iconColor="color4"></sub-title>
        <div v-for="inferiority in reportData.module_inferiority.inferiority" :key="inferiority.name" class="detail-block">
          <one-level-title :title="inferiority.name" iconColor="bg4"></one-level-title>
          <paragraph :content="inferiority.content" :mgbtValue="inferiority.detail&&inferiority.detail.length > 0 ? 'mgbt16' : ''"></paragraph>
          <label-block v-for="(item, index) in inferiority.detail" :key="item.name + index" :name="item.name" nameColor="bg4" :content="item.content" bgValue="block-bg4"></label-block>
        </div>
        <sub-title title="盲点分析" iconName="icon-report-analysis" iconColor="color2"></sub-title>
        <paragraph :content="reportData.module_inferiority.analysis.intro" mgbtValue="mgbt20"></paragraph>
        <div v-for="detail in reportData.module_inferiority.analysis.detail" :key="detail.name" class="detail-block">
          <one-level-title :title="detail.name" iconColor="bg2"></one-level-title>
          <paragraph :content="detail.content"></paragraph>
        </div>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <tc-label :tagsList="reportData.expert_advice.tags" mgbtValue="mgbt20"></tc-label>
        <paragraph :content="reportData.expert_advice.content"></paragraph>
      </block>
      <!-- 推荐科目recommended_subject -->
      <block blockTitle="推荐科目">
        <sub-title title="针对高中生" iconName="icon-report-high-school" iconColor="color1"></sub-title>
        <paragraph :content="reportData.recommended_subject.for_school.title" mgbtValue="mgbt20"></paragraph>
        <tc-table :rowsData="reportData.recommended_subject.for_school.feature_list" bgColor="bg1"></tc-table>
        <sub-title title="针对大学生" iconName="icon-report-college" iconColor="color2"></sub-title>
        <paragraph :content="reportData.recommended_subject.for_university.title" mgbtValue="mgbt20"></paragraph>
        <div v-for="detail in reportData.recommended_subject.for_university.detail" :key="detail.name" class="detail-block">
          <one-level-title :title="detail.name" iconColor="bg2"></one-level-title>
          <label-block :name="detail.intro_name" nameColor="bg2" :content="detail.intro" bgValue="block-bg2"></label-block>
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
import LabelBlock from './comprise/label-block.vue'
import TcLabel from './comprise/tc-label.vue'
import TcTable from './comprise/table-three.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'SelectionReport',
  components: {
    Top,
    Block,
    SubTitle,
    Paragraph,
    OneLevelTitle,
    LabelBlock,
    TcLabel,
    TcTable,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '选科规划',
          content: '通过全面的分析，选择合适的科目，将自己的优势发挥到最大',
          right: '共0页',
          intro: ''
        },
        module_advantage: {
          intro: '',
          advantage: []
        },
        module_inferiority: {
          intro: '',
          inferiority: [],
          analysis: {
            intro: '',
            detail: []
          }
        },
        expert_advice: {
          tags: [],
          content: ''
        },
        recommended_subject: {
          for_school: {
            title: '',
            feature_list: []
          },
          for_university: {
            title: '',
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
      Service.selection_report().then(data => {
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
  .selection-report-wrap {
    height: 100%;
  }
  .detail-block {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
</style>

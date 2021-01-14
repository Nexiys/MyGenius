<template>
  <div class="volunteer-report-wrap">
    <top
      reportType="7"
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
        <div v-for="advantage in reportData.module_advantage.advantage" :key="advantage.name" class="advantage-block">
          <one-level-title :title="advantage.name" iconColor="bg3"></one-level-title>
          <paragraph :content="advantage.content"></paragraph>
        </div>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.expert_advice.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="推荐专业" iconName="icon-report-fit" iconColor="color3"></sub-title>
        <paragraph :content="reportData.expert_advice.recommended_major.title" mgbtValue="mgbt20"></paragraph>
        <div v-for="item in reportData.expert_advice.recommended_major.detail" :key="item.name">
          <one-level-title :title="item.name" iconColor="bg3" mgbtValue="mgbt20"></one-level-title>
          <paragraph :content="item.content" mgbtValue="mgbt20"></paragraph>
        </div>
        <tc-table :columns="reportData.expert_advice.recommended_major.table.table_top" :rows="reportData.expert_advice.recommended_major.table.table_body"></tc-table>
        <sub-title title="专业培养" iconName="icon-report-ability" iconColor="color2"></sub-title>
        <paragraph :content="reportData.expert_advice.major_training.title" mgbtValue="mgbt24"></paragraph>
        <div v-for="step in reportData.expert_advice.major_training.detail" :key="step.name" class="advantage-block">
          <one-level-title :title="step.name" iconColor="bg2" mgbtValue="mgbt16"></one-level-title>
          <div :class="[step.detail&&step.detail.length > 1 ? 'step-flex' : '']">
            <label-block class="step" v-for="(item, index) in step.detail" :key="item.name + index" :name="item.name" nameColor="bg2" :content="item.content" bgValue="block-bg2"></label-block>
          </div>
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
import TcTable from './comprise/table-two.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'VolunteerReport',
  components: {
    Top,
    Block,
    SubTitle,
    Paragraph,
    OneLevelTitle,
    LabelBlock,
    TcTable,
    NotDone,
    NotBuild,
    DefaultPart
  },
  data () {
    return {
      reportData: {
        top: {
          name: '志愿填报',
          content: '清楚了解自己在各个潜能方面的优势及不足，并通过训练有针对性的提升',
          right: '共0页',
          intro: ''
        },
        module_advantage: {
          intro: '',
          advantage: []
        },
        expert_advice: {
          intro: '',
          major_training: {
            title: '',
            detail: []
          },
          recommended_major: {
            title: '',
            detail: [],
            table: {
              table_top: [],
              table_body: []
            }
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
      Service.volunteer_report().then(data => {
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
  .volunteer-report-wrap {
    height: 100%;
    .advantage-block {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
</style>

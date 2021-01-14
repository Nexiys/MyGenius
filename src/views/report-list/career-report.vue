<template>
  <div class="career-report-wrap">
    <top
      reportType="8"
      :title="reportData.top.name"
      :description="reportData.top.content"
      :total="reportData.top.right"
    ></top>
    <div class="report-main" v-if="reportStatus === 3">
      <!-- 头部内容 -->
      <div class="top-content" v-html="reportData.top.intro"></div>
      <!-- 模块优势module_advantage -->
      <block blockTitle="职业介绍">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.module_advantage.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="优势维度" iconName="icon-report-advantage" iconColor="color3"></sub-title>
        <div v-for="advantage in reportData.module_advantage.advantage" :key="advantage.name" class="scotoma-block">
          <one-level-title :title="advantage.name" :rightWord="advantage.mine" iconColor="bg3"></one-level-title>
          <paragraph :content="advantage.content"></paragraph>
        </div>
      </block>
      <!-- 模块盲点module_inferiority -->
      <block blockTitle="模块盲点">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.module_inferiority.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="盲点维度" iconName="icon-report-inferiority" iconColor="color4"></sub-title>
        <div v-for="scotoma in reportData.module_inferiority.advantage" :key="scotoma.name" class="scotoma-block">
          <one-level-title :title="scotoma.name" iconColor="bg4"></one-level-title>
          <paragraph :content="scotoma.content" :mgbtValue="scotoma.detail&&scotoma.detail.length > 0 ? 'mgbt16' : 'mgbt24'"></paragraph>
          <label-block v-for="detail in scotoma.detail" :key="detail.name" :name="detail.name" nameColor="bg4" :content="detail.content" bgValue="block-bg4"></label-block>
        </div>
      </block>
      <!-- 专家建议expert_advice -->
      <block blockTitle="专家建议">
        <sub-title title="总体概述" iconName="icon-report-summary" iconColor="color1"></sub-title>
        <paragraph :content="reportData.expert_advice.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="操作步骤" iconName="icon-report-step" iconColor="color2"></sub-title>
        <div v-for="step in reportData.expert_advice.step.detail" :key="step.name" :class="step.detail&&step.detail.length < 2 ? 'step-block' : ''">
          <one-level-title :title="step.name" iconColor="bg2" mgbtValue="mgbt20"></one-level-title>
          <div :class="[step.detail&&step.detail.length > 1 ? 'step-flex' : '']">
            <label-block class="step" v-for="(item, index) in step.detail" :key="item.name + index" :name="item.name" nameColor="bg2" :content="item.content" bgValue="block-bg2" :wdValue="step.detail&&step.detail.length > 1 ? 'wd420' : ''" :mgbtValue="step.detail&&step.detail.length > 1 ? 'no-mglf' : ''"></label-block>
          </div>
        </div>
        <paragraph :content="reportData.expert_advice.step.conclusion" mgbtValue="mgbt24"></paragraph>
        <sub-title title="推荐职业" iconName="icon-report-occupation" iconColor="color3"></sub-title>
        <paragraph :content="reportData.expert_advice.recommended_career.content" mgbtValue="mgbt24"></paragraph>
        <tc-table :columns="reportData.expert_advice.recommended_career.table.table_top" :rows="reportData.expert_advice.recommended_career.table.table_body"></tc-table>
      </block>
      <!-- 职业介绍career_intro -->
      <block blockTitle="职业介绍">
        <sub-title title="总体概述" iconName="icon-report-concept" iconColor="color1"></sub-title>
        <paragraph :content="reportData.career_intro.intro" mgbtValue="mgbt24"></paragraph>
        <sub-title title="操作步骤" iconName="icon-report-step" iconColor="color2"></sub-title>
        <div v-for="step in reportData.career_intro.step" :key="step.name">
          <one-level-title :title="step.name" iconColor="bg2" mgbtValue="mgbt20"></one-level-title>
          <label-block v-for="detail in step.detail" :key="detail.name" :name="detail.name" nameColor="bg2" :content="detail.content" mgbtValue="block-bg2"></label-block>
        </div>
      </block>
      <!-- 测评寄语 -->
      <block blockTitle="测评寄语">
        <paragraph :content="reportData.evaluation_message" :isIndent="true"></paragraph>
      </block>
      <!-- 温馨提示 -->
      <block blockTitle="温馨提示">
        <paragraph :content="reportData.reminder" :isIndent="true"></paragraph>
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
import TcTable from './comprise/table.vue'
import NotDone from './comprise/not-done.vue'
import NotBuild from './comprise/not-build.vue'
import DefaultPart from './comprise/default-part.vue'

export default {
  name: 'CareerReport',
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
          name: '职业发展',
          content: '做好自己的人生规划，为更好的实现自己的人生价值打下基础',
          right: '共0页',
          intro: ''
        },
        module_advantage: {
          intro: '',
          advantage: []
        },
        module_inferiority: {
          intro: '',
          advantage: {}
        },
        expert_advice: {
          intro: '',
          step: {
            conclusion: '',
            detail: []
          },
          recommended_career: {
            content: '',
            table: {
              table_top: [],
              table_body: []
            }
          }
        },
        career_intro: {
          intro: '',
          step: []
        },
        evaluation_message: '',
        reminder: ''
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
      Service.career_report().then(data => {
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
  .career-report-wrap {
    height: 100%;
  }
  .step-block {
    margin-bottom: 20px;
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
  .scotoma-block {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
</style>

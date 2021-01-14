import { factory } from './http-methods'

var obj = {
  get: {
    // 进入测试
    enter: 'api/v0.9/evaluation/enter',
    // 题目介绍
    introduction: 'api/v0.9/evaluation/evaluation_intro',
    // 语音环
    voice_ring: 'api/v0.9/evaluation/21_gzjyyyh',
    // 转换
    transformation: 'api/v0.9/evaluation/18_gzjyzh',
    // 视觉空间
    vision_space: 'api/v0.9/evaluation/20_gzjysjkjmb',
    // 记忆联想策略
    lenovo_strategy: 'api/v0.9/evaluation/13_jylxcl',
    // 场景题
    scene: 'api/v0.9/evaluation/22_cjt',
    // 整体报告
    whole_report: 'api/v0.9/evaluation/report_total',
    // 认知潜能
    perception_report: 'api/v0.9/evaluation/report_1',
    // 学习潜能
    learning_report: 'api/v0.9/evaluation/report_2',
    // 兴趣倾向
    interest_report: 'api/v0.9/evaluation/report_3',
    // 性格特点
    character_report: 'api/v0.9/evaluation/report_4',
    // 选科规划
    selection_report: 'api/v0.9/evaluation/report_5',
    // 志愿填报
    volunteer_report: 'api/v0.9/evaluation/report_6',
    // 职业发展
    career_report: 'api/v0.9/evaluation/report_7',
    // 中途退出
    exit: 'api/v0.9/evaluation/exit'
  },
  post: {
    // 登录
    login: 'api/v0.9/login/login',
    // 语音环数据提交
    voice_ring_submit: 'api/v0.9/evaluation/21_gzjyyyh_input',
    // 转换数据提交
    transformation_submit: 'api/v0.9/evaluation/18_gzjyzh_input',
    // 视觉空间数据提交
    vision_space_submit: 'api/v0.9/evaluation/20_gzjysjkjmb_input',
    // 记忆联想策略数据提交
    lenovo_strategy_submit: 'api/v0.9/evaluation/13_jylxcl_input',
    // 场景题数据提交
    scene_submit: 'api/v0.9/evaluation/22_cjt_input'
  }
}

export default factory(obj)

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 报告
const Report = () => import('../views/report/index.vue')
// 整体报告
const WholeReport = () => import('../views/report-list/whole-report.vue')
// 报告-认知潜能
const PerceptionReport = () => import('../views/report-list/perception-report.vue')
// 报告-学习潜能
const LearningReport = () => import('../views/report-list/learning-report.vue')
// 报告-兴趣倾向
const InterestReport = () => import('../views/report-list/interest-report.vue')
// 报告-性格特点
const CharacterReport = () => import('../views/report-list/character-report.vue')
// 报告-选科规划
const SelectionReport = () => import('../views/report-list/selection-report.vue')
// 报告-志愿填报
const VolunteerReport = () => import('../views/report-list/volunteer-report.vue')
// 报告-职业发展
const CareerReport = () => import('../views/report-list/career-report.vue')
// 报告-题目
const Question = () => import('../views/questions/index.vue')

const routes = [
  {
    path:'',
    redirect:'/Login'
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{
      needLogin: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/Guide',
    name: 'Guide',
    component: () => import('../views/guide/index.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/Equipment',
    name: 'Equipment',
    component: () => import('../views/equipment/index.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/speaker',
    name: 'speaker',
    component: () => import('../views/equipment/speaker.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/keyboard',
    name: 'keyboard',
    component: () => import('../views/equipment/keyboard.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/mouse',
    name: 'mouse',
    component: () => import('../views/equipment/mouse.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/equipment/result.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/eqindex',
    name: 'eqindex',
    component: () => import('../views/equipment/index.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/one',
    name: 'one',
    component: () => import('../views/personality/induce.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/quiet',
    name: 'quiet',
    component: () => import('../views/personality/quiet.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/befinished',
    name: 'befinished',
    component: () => import('../views/finished/index.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/threeindex',
    name: 'threeindex',
    component: () => import('../views/attention/three/index.vue'),
    meta:{
      needLogin: false
    }
  },
	// 逻辑游戏一(表象游戏) —— 介绍
	{
	  path: '/lointroduce',
	  name: 'LOIntroduce',
	  component: () => import('../views/logic/one/index.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏一（表象游戏）—— 练习阶段
	{
	  path: '/loexercise',
	  name: 'LOExercise',
	  component: () => import('../views/logic/one/exercise-stage.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏一（表象游戏）—— 过渡页面
	{
	  path: '/lotransition',
	  name: 'LOTransition',
	  component: () => import('../views/logic/one/transition-page.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏一（表象游戏）—— 正式阶段
	{
	  path: '/loformal',
	  name: 'LOFormal',
	  component: () => import('../views/logic/one/formal-stage.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏二(演绎推理) —— 介绍
	{
	  path: '/ltintroduce',
	  name: 'LTIntroduce',
	  component: () => import('../views/logic/two/index.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏二（演绎推理）—— 正式阶段
	{
	  path: '/ltformal',
	  name: 'LTFormal',
	  component: () => import('../views/logic/two/formal-stage.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏三(归纳推理) —— 介绍
	{
	  path: '/lthintroduce',
	  name: 'LTHIntroduce',
	  component: () => import('../views/logic/three/index.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 逻辑游戏三（归纳推理）—— 正式阶段
	{
	  path: '/lthformal',
	  name: 'LTHFormal',
	  component: () => import('../views/logic/three/formal-stage.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 注意游戏五（注意转移游戏）—— 介绍页面
	{
	  path: '/afintroduce',
	  name: 'AFIntroduce',
	  component: () => import('../views/attention/five/index.vue'),
	  meta:{
	    needLogin: false
	  }
	}, 
	// 注意游戏五（注意转移游戏）—— 练习阶段
	{
	  path: '/afiexercise',
	  name: 'AFIExercise',
	  component: () => import('../views/attention/five/exercise-stage.vue'),
	  meta:{
	    needLogin: false
	  }
	},
	// 注意游戏五（注意转移游戏）—— 过渡阶段
	{
		path: '/afitransition',
		name: 'AFITransition',
		component: () => import('../views/attention/five/transition-page.vue'),
		meta:{
			needLogin: false
		}
  },
  	// 注意游戏五（注意转移游戏）—— 正式阶段
	{
		path: '/afiformal',
		name: 'AFIFormal',
		component: () => import('../views/attention/five/formal-stage.vue'),
		meta:{
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 介绍页面
	{
		path: '/msintroduce',
		name: 'MSIntroduce',
		component: () => import('../views/memory/six/index.vue'),
		meta: {
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 学习阶段
	{
		path: '/msistudy',
		name: 'MSIStudy',
		component: () => import('../views/memory/six/study-stage.vue'),
		meta: {
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 练习阶段 —— 读题
	{
		path: '/msiread',
		name: 'MSIRead',
		component: () => import('../views/memory/six/read-question.vue'),
		meta: {
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 练习阶段
	{
		path: '/msiexercise',
		name: 'MSIExercise',
		component: () => import('../views/memory/six/exercise-stage.vue'),
		meta: {
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 过渡页面
	{
		path: '/msitransition',
		name: 'MSITransition',
		component: () => import('../views/memory/six/transition-page.vue'),
		meta: {
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 正式阶段 —— 干扰项
	{
		path: '/msiformaldisturb',
		name: 'MSIFormalDisturb',
		component: () => import('../views/memory/six/formal-stage-disturb.vue'),
		meta: {
			needLogin: false
		}
	},
	// 记忆游戏六(记忆复述策略) —— 正式页面
	{
		path: '/msiformal',
		name: 'MSIFormal',
		component: () => import('../views/memory/six/formal-stage.vue'),
		meta: {
			needLogin: false
		}
	},
	// 组件 - 退出页面弹窗
	{
		path: '/exitdialog',
		name: 'ExitDialog',
		component: () => import('../components/Exit/index.vue'),
		meta: {
			needLogin: false
		}
	},
	// 组件 - 暂停页面弹窗
	{
		path: '/pausedialog',
		name: 'PauseDialog',
		component: () => import('../components/Pause/index.vue'),
		meta: {
			needLogin: false
		}
	},
	// 组件 - 内容区的头部，包括 进度、中间标题、总用时
	{
	  path: '/contentheader',
	  name: 'ContentHeader',
	  component: () => import('../components/ContentHeader/index.vue'),
		meta: {
			needLogin: false
		}
	},
  {
    path: '/topic',
    name: 'topic',
    component: () => import('../views/attention/three/topic-exploring.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/exercisrstage',
    name: 'exercisrstage',
    component: () => import('../views/attention/three/exercise-stage.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/transitionpage',
    name: 'transitionpage',
    component: () => import('../views/attention/three/transition-page.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/formalstage',
    name: 'formalstage',
    component: () => import('../views/attention/three/formal-stage.vue'),
    meta:{
      needLogin: false
    }
  },
  {
    path: '/topicexploring',
    name: 'topicexploring',
    component: () => import('../views/attention/three/topic-exploring-2.vue'),
    meta:{
      needLogin: false
    }
  },
  // {
  //   path: '/introduce',
  //   name: 'introduce',
  //   component: () => import('../views/four/introduce.vue'),
  //   meta:{
  //     needLogin: false
  //   }
  // },
  // {
  //   path: '/playrules',
  //   name: 'playrules',
  //   component: () => import('../views/four/play-rules.vue'),
  //   meta:{
  //     needLogin: false
  //   }
  // },
  // {
  //   path: '/game',
  //   name: 'game',
  //   component: () => import('../views/four/game.vue'),
  //   meta:{
  //     needLogin: false
  //   }
  // },
	{
    path: '/report',
    component: Report,
    redirect: '/report/whole',
    children: [
      {
        path: 'whole',
        component: WholeReport
      },
      {
        path: 'perception',
        component: PerceptionReport
      },
      {
        path: 'learning',
        component: LearningReport
      },
      {
        path: 'interest',
        component: InterestReport
      },
      {
        path: 'character',
        component: CharacterReport
      },
      {
        path: 'selection',
        component: SelectionReport
      },
      {
        path: 'volunteer',
        component: VolunteerReport
      },
      {
        path: 'career',
        component: CareerReport
      }
    ]
  },
  {
    path: '/question',
    name: 'Question',
    component: Question
  }
]
// const router = createRouter({
//   mode:"hash",
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
const router = new VueRouter({
	// mode: 'history',
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: () => {
		// 禁止浏览器后退操作
		history.pushState(null, null, document.URL)
	}
})

export default router

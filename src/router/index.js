import { createRouter, createWebHistory } from 'vue-router'

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
	// 逻辑游戏一（表象游戏）—— 过渡页面
	{
	  path: '/lotransition',
	  name: 'LOTransition',
	  component: () => import('../views/logic/one/transition-page.vue'),
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
	// 逻辑游戏一（表象游戏）—— 正式阶段
	{
	  path: '/loformal',
	  name: 'LOFormal',
	  component: () => import('../views/logic/one/formal-stage.vue'),
	  meta:{
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
	
	// 组件 - 内容区的头部，包括 进度、中间标题、总用时
	{
	  path: '/content-header',
	  name: 'ContentHeader',
	  component: () => import('../components/ContentHeader/index.vue'),
	},
  
]
const router = createRouter({
  mode:"hash",
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

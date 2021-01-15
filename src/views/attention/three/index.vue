<template>
<div>
	<!-- 注意游戏三（注意稳定性游戏）介绍页面 -->
	<!-- 头部组件：logo、暂停、退出 -->
		<question-header @question-paused="questionPausedHandle"
      @question-quit="questionQuitHandle">
	</question-header>
    <!-- 暂停弹窗 -->
    <dialog-paused
     v-if="pausedFlag"
      @close-paused-dialog="closePausedDialogHandle"
    ></dialog-paused>
    <!-- 退出弹窗 -->
    <dialog-exit
      v-if="exitFlag"
      @comfirm-exit="comfirmExitHandle"
      @abandon-exit="abandonExitHandle"
    ></dialog-exit>
	<section class="content-area">
		<div class="c-header">
			<div class="c-h-left">
				<em>进度：</em>
				<em>0</em>
				<em>/00</em>
			</div>
			<div class="c-h-middle"></div>
			<div class="c-h-right">
				<em>用时：</em>
				<em>02:28:00</em>
			</div>
		</div>
		<!-- 提示内容区块 -->
		<div class="introduce">
			<div class="i-box">
				<div class="i-con">
					<h2>{{ title }}</h2>
					<p v-html="introductions"></p>
					<router-link to="topic">开始游戏</router-link>
				</div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
	import QuestionHeader from '../../../components/Header/index.vue'
	import DialogPaused from '../../../components/Pause/index.vue'
	import DialogExit from '../../../components/Exit/index.vue'
	export default {
		name: "threeindex",
		components: {
			QuestionHeader,
			DialogPaused,
			DialogExit
		},
		data(){
			return{
				title:'',						// 介绍页标题
				introductions:'' ,
				pausedFlag:false,
				exitFlag:false
				   // 介绍页内容
			}
		},
		created() {
			this.getData()
			localStorage.removeItem("reload");
    },
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					this.$router.push("login")
					return false
				}
				
				this.title = data.data.data.introduce.title;
				this.introductions = data.data.data.introduce.introductions;
				let title = this.title;
				let introductions = this.introductions;
			},
    // 答题阶段暂停处理
    questionPausedHandle () {
      // 整体时间暂停
      this.wholeTimeStop()
      // 暂停弹窗出现
      this.pausedFlag = true
    },
    // 答题阶段退出处理
    questionQuitHandle () {
      // 整体时间暂停
      this.wholeTimeStop()
      this.exitFlag = true
    },
    // 关闭暂停弹窗
    closePausedDialogHandle () {
      // 整体时间开始
      this.wholeTimeStart()
      this.pausedFlag = false
    },
    // 确认退出
    comfirmExitHandle () {
      this.exitFlag = false
      // 跳转到首页
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    },
    // 取消退出
    abandonExitHandle () {
      // 整体时间开始
      this.wholeTimeStart()
      this.exitFlag = false
    },
    // 全部时间停止
    wholeTimeStop () {
      // 倒计时暂停
    //   this.timeStop()
      this.$store.commit('wholeTimeStop')
    },
    // 全部时间开始
    wholeTimeStart () {
      // 倒计时开始
    //   this.timeStart()
      this.$store.commit('wholeTimeStart')
    }
		},
	}
</script>

<style lang="less" scoped>
	@import '~@/assets/style/attention-three.less';
</style>
<style  scoped>
	@import '~@/assets/style/attention-three.css';
</style>
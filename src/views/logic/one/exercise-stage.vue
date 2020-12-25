<template>
	<!-- 逻辑游戏一（表象游戏）练习阶段 -->
	<section class="header">
		<div class="logo-modular">
			<a href="#"><img src="../../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section>
	<section class="apart-body">
		<div class="apart-top">
			<div class="content-header">
				<div class="left">
					<span>进度：</span>
					<span>0</span>
					<span>/00</span>
				</div>
				<div class="right">
					<span>用时：</span>
					<span>02:28:00</span>
				</div>
			</div>
			
			<div class="question">
				<span class="stage-tit">{{ stage_tit }}</span>
				<span class="answer-guide">{{ answer_guide }}</span>
				<div class="question-box">
					<i class="icon-surface_1B3"></i>
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<router-link to="lotransition">A<i class="icon-surface_1B4"></i></router-link>
			<router-link to="lotransition">B<i class="icon-surface_1B1"></i></router-link>
			<router-link to="lotransition">C<i class="icon-surface_1A5"></i></router-link>
			<router-link to="lotransition">D<i class="icon-surface_1A2"></i></router-link>
		</div>
	</section>
</template>

<script>
	export default {
		name:'LOExercise',
		data() {
			return {
				stage_tit: String,        // 阶段标题
				answer_guide: String,     // 答题阶段指导标题
				question: Array,          // 问题数组   
				answer: Array,            // 答案选项数组
			}
		},
		created() {
			this.getData();
		},
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/08_bxyx', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					console.log("数据获取失败！");
					this.$router.push("login")
					return false
				}
				// 阶段标题
				this.stage_tit = data.data.data[1].stage_tit;
				let stage_tit = this.stage_tit;
				console.log(stage_tit)
				// 答题阶段指导标题
				this.answer_guide = data.data.data[1].answer_guide;
				let answer_guide = this.answer.answer_guide;
				// 问题数组
				this.question = this.answer_guide = data.data.data[1].data;
				console.log(this.question[0].content);
			},
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/logic-one.less';
</style>

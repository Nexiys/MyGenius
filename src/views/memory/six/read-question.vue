<template>
	<!-- 记忆游戏六（记忆复述策略）学习阶段 —— 读题 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section>
	<section class="content-area">
		<div class="c-header">
			<div class="c-h-left">
				<em>进度：</em>
				<em>{{index}}</em>
				<em>/{{length}}</em>
			</div>
			<div class="c-h-middle"></div>
			<div class="c-h-right">
				<em>用时：</em>
				<em>02:28:00</em>
			</div>
		</div>
		<div class="topic-exploring-area">
			<h2 class="stage-tit">练习阶段</h2>
			<h2 class="guide-tit">请先认真读题</h2>
			<div class="main">
				<div class="main-box" v-html="content">

				</div>
			</div>
			<router-link class="start-btn" to="msiexercise">开始游戏</router-link>
		</div>
	</section>
</template>

<script>
	export default {
		name:'MSIRead',
		data(){
			return{	
				content:'', //提示主体内容
				index:1,
				length:0
			}
		},
		created() {
			this.getData();
			localStorage.removeItem("reload");
    	},
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/11_jyfscl', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					this.$router.push("login")
					return false
				}
				
				this.content = data.data.data.practice.question.data[0].content
				this.length = data.data.data.practice.question.data.length
			}
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

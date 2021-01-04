<template>
	<!-- 注意游戏五（注意转移游戏）介绍页面 -->
	<section class="header">
		<div class="logo-modular">
			<a href="#"><img src="../../../assets/img/logo.png" ></a>
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
				<em>0</em>
				<em>/00</em>
			</div>
			<div class="c-h-middle"></div>
			<div class="c-h-right">
				<em>用时：</em>
				<em>02:28:00</em>
			</div>
		</div>
		<!-- 题型介绍 -->
		<div class="introduce">
			<div class="i-box">
				<div class="i-con">
					<h2>{{ title }}</h2>
					<p v-html="introductions"></p>
					<router-link to="lthexercise">开始游戏</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "AFIntroduce",
		data(){
			return{
				title:'',						// 介绍页标题
				introductions:''    // 介绍页内容
			}
		},
		created() {
			this.getData();
			localStorage.removeItem("reload");
    },
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/05_zyzyyx', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					this.$router.push("login")
					return false
				}
				
				this.title = data.data.data.introduce.title;
				this.introductions = data.data.data.introduce.introductions;
				let title = this.title;
				let introductions = this.introductions;
			},
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/attention-five.less';
</style>

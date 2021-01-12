<template>
	<!-- 记忆游戏六（记忆复述策略）介绍页面 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<Header />
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
					<router-link to="msistudy">开始游戏</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	export default {
		name: "MSIntroduce",
		components: {
			Header,
		},
		data(){
			return{
				title:'',	// 介绍页标题
				introductions:''    // 介绍页内容
			}
		},
		created() {
			this.getData();
			localStorage.removeItem("reload");
    },
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/evaluation_intro?num=11', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					this.$router.push("login")
					return false
				}
				
				this.title = data.data.data.title;
				this.introductions = data.data.data.intro;
				let title = this.title;
				let introductions = this.introductions;
			},
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

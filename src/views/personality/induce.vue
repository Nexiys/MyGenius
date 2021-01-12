<template>
	<!-- 人格测评介绍页面 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<Header />
	<section class="content-area-induce">
			 <div class="c-header">
					<div class="c-h-left">
							<em>进度：</em>
							<em>0</em>
							<em>/{{question_total}}</em>
					</div>
					<div class="c-h-middle"></div>
					<div class="c-h-right">
							<em>用时：</em>
							<em>02:28:00</em>
					</div>
			</div>
			
			<div class="introduce">
				<div class="i-box">
					<div class="i-con">
						<h2>{{ title }}</h2>
						<p v-html="introductions"></p>
						<router-link to="/quiet" @click="desnum()">开始测评</router-link>
					</div>
				</div>
			</div>
			
	</section>
</template>
<script>
	import Header from '../../components/Header/index.vue'
	export default {
		name: "one",
		components: {
			Header,
		},
		data(){
			return{
				title:'',						// 介绍页标题
				introductions:'',   // 介绍页内容
				question_total:'',  // 总题数
			}
		},
		created() {
      this.getData()
    },
		methods: {
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/00_rgqxcp', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
						console.log("获取数据失败")
						localStorage.removeItem('data');
						this.$router.push("login")
				}
				this.title = data.data.introduce.title
				this.introductions = data.data.introduce.introductions
				this.question_total = data.data.question_total
				let title = this.title
				let introductions = this.introductions
				let question_total = this.question_total
			},       
			desnum() {
				sessionStorage.setItem("desnum",1)
				sessionStorage.setItem("num",0)
			}
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/personaliy.less';
</style>
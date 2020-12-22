<template>
	<!-- 注意游戏三（注意稳定性游戏）介绍页面 -->
	<section class="header">
		<div class="logo-modular">
			<!-- <a href=""><img src="../../assets/img/logo.png" ></a> -->
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
		<!-- 提示内容区块 -->
		<div class="introduce">
			<div class="i-box">
				<div class="i-con">
					<h2>注意游戏三</h2>
					<p v-html="introductions"></p>
					<!-- <a href="#">开始答题</a> -->
					<router-link to="topic">开始答题</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "threeindex",
		data(){
			return{
				introductions:''
			}
		},
		created(){
			this.getData()
        },
		methods:{
			async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
                   this.$router.push("login")
                    return false
				}
				
				this.introductions = data.data.data.introduce.introductions
						
			},
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/attention-three.less';
</style>

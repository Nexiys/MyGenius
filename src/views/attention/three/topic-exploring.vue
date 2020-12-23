<template>
	<!-- 注意游戏三（注意稳定性游戏）读题页面 -->
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
				<em>0</em>
				<em>/00</em>
			</div>
			<div class="c-h-middle"></div>
			<div class="c-h-right">
				<em>用时：</em>
				<em>02:28:00</em>
			</div>
		</div>
		<div class="topic-exploring-area">
			<h2 class="stage-tit">{{stage_tit}}</h2>
			<h2 class="guide-tit">{{guide_tit}}</h2>
			<div class="main">
				<div class="main-box">
					<p class="des-con" v-html="des_con"></p>
					<button class="start-btn" @click="routergo">开始答题</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import timing from '../../../components/TimingRing/index'
	export default {
		components: {timing},
		name: "topic",
		data(){
			return{
			des_con:'',
			guide_tit:'',
			stage_tit:'',
			numb:10
			}
		},
		created(){
			this.getData();
        },
		methods:{
			async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
                    this.$router.push("login")
                    return false
				}
				this.stage_tit=data.data.data[1].stage_tit	
				this.des_con = data.data.data[1].des_con
				this.guide_tit =data.data.data[1].guide_tit
			},


			routergo(){
				this.$router.push("exercisrstage")
			}
		},
	}	
</script>

<style lang="less">
	@import '~@/assets/style/attention-three.less';
</style>

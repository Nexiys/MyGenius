<template>
	<!-- 记忆游戏六（记忆复述策略）学习阶段 -->
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
			<h2 class="stage-tit">练习阶段</h2>
			<h2 class="guide-tit">请您学习看到的“线索—目标”配对词组</h2>
			<TimingRing :originProgressText ="60"></TimingRing>
			<div class="main">
				<div class="main-box">
					<div class="container">
						<div class="prev"><i class="icon-page-left" @click="nex(0)"></i></div>
						<div class="study-con">
							<span v-for="(item) in listData">{{item}}</span>
						</div>
						
						<div class="next"><i class="icon-page-right" @click="nex(1)"></i></div>
						
					</div>
					<ul class="page-num">
						<li class="num" @click="nex(0)"  v-bind:class="{ focus: isActive==0 }">1</li>
						<li class="num" @click="nex(1)" v-bind:class="{ focus: isActive==1 }">2</li> 
					</ul>
				</div>
			</div>
			<router-link class="start-btn" to="msiread">进入测试</router-link>
		</div>
	</section>
</template>

<script>
	import TimingRing from '../../../components/TimingRing/index'
	export default {
		components: { TimingRing },
		name:'MSIStudy',
		data(){
			return{
				isActive:0,
				title:'',	// 介绍页标题
				introductions:'',    // 介绍页内容
				listData:'', // 数据
				thisIndex:0, // 下标
				spareData:'' //备用数据
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
				this.spareData =  data.data.data.practice.study.content
				this.listData = data.data.data.practice.study.content[this.thisIndex]
			},
			nex(x){
				this.thisIndex = x 
				this.isActive = x
				this.listData =this.spareData[this.thisIndex]
			
			}
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

<template>
	<!-- 记忆游戏六（记忆复述策略）学习阶段 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
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
		<div class="topic-exploring-area">
			<h2 class="stage-tit">练习阶段</h2>
			<h2 class="guide-tit">请您学习看到的“线索—目标”配对词组</h2>
			<TimingRing :originProgressText ="timelimit"></TimingRing>
			<div class="main">
				<div class="main-box">
					<div class="container">
						<div class="prev" @click="tonex(0)"><i class="icon-page-left"></i></div>
						<div class="study-con">
							<span v-for="(item) in listData">{{item}}</span>
						</div>
						<div class="next" @click="tonex(0)"><i class="icon-page-right"></i></div>
					</div>
					<ul class="page-num">
						<li class="num" @click="nex(0)"  v-bind:class="{ focus: isActive==0 }">1</li>
						<li class="num" @click="nex(1)" v-bind:class="{ focus: isActive==1 }">2</li> 
					</ul>
				</div>
			</div>
			<a class="start-btn" @click="toGo()">进入测试</a>
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	import TimingRing from '../../../components/TimingRing/index'
	export default {
		components: { 
			TimingRing,
			Header,
		},
		name:'MSIStudy',
		data(){
			return{
				isActive:0,
				title:'',	// 介绍页标题
				introductions:'',    // 介绍页内容
				listData:'', // 数据
				thisIndex:0, // 下标
				spareData:'', //备用数据
				timelimit:60,
			}
		},
		created() {
			this.getData();
			localStorage.removeItem("reload");
			this.timeFun()
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
				this.timelimit =data.data.data.practice.study.time_limit
				//console.log(this.timelimit)
			},
			nex(x){
				this.thisIndex = x 
				this.isActive = x
				this.listData =this.spareData[this.thisIndex]
			
			},
			tonex(x){
				console.log(this.thisIndex)
				if(this.thisIndex==0){
					this.thisIndex = x+1
					this.isActive = x+1
					this.listData =this.spareData[this.thisIndex]
				}else if(this.thisIndex==1){
					this.thisIndex = x
					this.isActive = x
					this.listData =this.spareData[this.thisIndex]
				}
			},
			timeFun() {
				let time = this.timelimit;
				console.log( this.timelimit)
				this.timer = setInterval(() => {
					if (time ==1) {
						clearInterval(this.timer);
						//this.timeFun()
						this.$router.push("msiread")
						// if(this.page == 6){
						// 	this.$router.push("lointroduce")
						// }
					} else {
						time--;
						console.log(time)
					}
				},1000);
			},
			toGo(){
				clearInterval(this.timer);
				this.$router.push("msiread")
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '~@/assets/style/memory-six.less';
</style>
<style scoped>
	@import '~@/assets/style/memory-six.css';
</style>
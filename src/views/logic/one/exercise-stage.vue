<template>
	<!-- 逻辑游戏一（表象游戏）练习阶段 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
	<Header />
	<section class="apart-body">
		<div class="apart-top">
			<div class="content-header">
				<div class="left">
					<span>进度：</span>
					<span>{{index+1}}</span>
					<span>/{{allNum}}</span>
				</div>
				<div class="right">
					<span>用时：</span>
					<span>02:28:00</span>
				</div>
			</div>
			
			<div class="question">
				<span class="stage-tit">{{ stage_tit }}</span>
				<span class="answer-guide">{{ answer_guide }}</span> 
				<div class="question-box"  v-html="dataList.content">
					
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<a  @click="toNext(index+1,dataList.question_num)" v-html="dataList.option_1"></a>
			<a  @click="toNext(index+1,dataList.question_num)" v-html="dataList.option_2"></a>
			<a  @click="toNext(index+1,dataList.question_num)" v-html="dataList.option_3"></a>
			<a  @click="toNext(index+1,dataList.question_num)" v-html="dataList.option_4"></a>
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	export default {
		name:'LOExercise',
		components: {
			Header,
		},
		data() {
			return {
				stage_tit: '',        // 阶段标题
				answer_guide: '',     // 答题阶段指导标题
				question: [],         // 问题数组 
				answer: [],           // 答案选项数组
				test:[],
				newData:'',
				dataList:'',
				index:0,
				allNum:''
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
				// 答题阶段指导标题
				this.answer_guide = data.data.data[1].answer_guide;
				let answer_guide = this.answer.answer_guide;
				this.newData = data.data.data[1].data
				this.dataList = data.data.data[1].data
				
				this.dataList =this.dataList[this.index] 
				this.allNum = this.newData.length
				console.log(this.dataList)
			
			},
	    	toNext(a,b){
				console.log(this.allNum )
				if(this.index == this.allNum -1 ){
					this.$router.push({path:"lotransition"})
				}else{
					this.index = this.index+a
					this.dataList = this.newData[a]	
					
					
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '~@/assets/style/logic-one.less';
</style>
<style  scoped>
	@import '~@/assets/style/logic-one.css';
</style>
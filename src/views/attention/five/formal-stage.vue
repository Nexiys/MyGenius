<template>
	<!-- 注意游戏五（注意）练习阶段 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
	<Header />
	<section class="apart-body">
		<div class="apart-top">
			<div class="content-header">
				<div class="left">
					<span>进度：</span>
					<span>{{number}}</span>
					<span>/{{total}}</span>
				</div>
				<div class="right">
					<span>用时：</span>
					<span>02:28:00</span>
				</div>
			</div>
			
			<div class="question">
				<span class="stage-tit">{{tip}}</span>
				<span class="answer-guide">{{topicList.title}}</span>
				<div class="question-box" v-html="topicList.content">
				
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<!-- ,Object.keys(topicList.option[0])[0]) 获取答题属性值 -->
			<a v-if="topicList && topicList.option && topicList.option[0].triangle !== undefined"  @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[0])[0])" >{{topicList.option[0].triangle}}</a> 
			<a v-if=" topicList && topicList.option && topicList.option[0].triangle !== undefined" @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[1])[0])" >{{topicList.option[1].square}}</a>
			<a v-if=" topicList && topicList.option && topicList.option[0].triangle !== undefined"  @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[2])[0])" >{{topicList.option[2].trapezoid}}</a>
			<a v-if=" topicList && topicList.option && topicList.option[0].triangle !== undefined"  @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[3])[0])" >{{topicList.option[3].diamond}}</a>
			<a v-if=" topicList && topicList.option && topicList.option[0].triangle !== undefined"  @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[4])[0])" >{{topicList.option[4].circular}}</a>


			<a v-if=" topicList && topicList.option && topicList.option[0].triangle == undefined" @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[0])[0])" >{{topicList.option[0].attribute_1 || topicList.option[0].attribute_2 || topicList.option[0].attribute_3}}</a>
			<a v-if=" topicList && topicList.option && topicList.option[0].triangle == undefined" @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[1])[0])" >{{topicList.option[1].attribute_1 || topicList.option[1].attribute_2 || topicList.option[1].attribute_3}}</a>
			<a v-if=" topicList && topicList.option && topicList.option[0].triangle == undefined" @click="toNext(topicList.question_num,topicList.answer, topicList.type ,Object.keys(topicList.option[2])[0])" >{{topicList.option[2].attribute_1 || topicList.option[2].attribute_2 || topicList.option[2].attribute_3}}</a>
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	export default {
		name:'AFIFormal',
		components: {
			Header,
		},
		data(){
			return{
				number:1, //进度
				total:'', //总题数
				topicList:[], //题
				sub : 0, //下标
				list:[], //备用数组
				dataAll:[], //回传数组,
				tip:'', //标题
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
				
				this.total = data.data.data[2][0].total_num
				this.tip =data.data.data[2][0].stage_type
				this.topicList = data.data.data[2][0].data[this.sub];
				this.list = data.data.data[2][0].data
				
			},
		    async toNext(a,b,c,d){
				console.log(d)
				let data = {question_num:a,answer:b == d?1:0,type:c}  
				this.dataAll.push(data)
				if(this.number == this.total){

					this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/05_zyzyyx_input',{
						 data:this.dataAll,
						 api_token: window.localStorage.data
					}) 
					this.$router.push("MSIntroduce")
				}else{
					this.number = this.number+1
					this.sub = this.sub+1
					this.topicList = this.list[this.sub]
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '~@/assets/style/attention-five.less';
</style>
<style scoped>
	@import '~@/assets/style/attention-five.css';
</style>
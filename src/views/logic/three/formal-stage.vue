<template>
	<!-- 逻辑游戏三（归纳推理）正式阶段 -->
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
				<div class="question-box">
					<p>{{thisimg!==''?thisp:''   }}</p>
					<div class="img-box" v-html="thisimg!==''?thisimg:thisp">
					</div>
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<a @click="toNext(topicList.question_num,topicList.answer_1, new Date().getTime())" v-html="topicList.option_1"></a>
			<a @click="toNext(topicList.question_num,topicList.answer_2, new Date().getTime())" v-html="topicList.option_2"></a>
			<a @click="toNext(topicList.question_num,topicList.answer_3, new Date().getTime())" v-html="topicList.option_3"></a>
			<a @click="toNext(topicList.question_num,topicList.answer_4, new Date().getTime())" v-html="topicList.option_4"></a>
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	export default {
		name:'LTHFormal',
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
				thisTime:new Date().getTime(),
				dataAll:[], //回传数组	
				thisp:'',
				thisimg:''		
			}
		},
		created() {
			this.getData();
			localStorage.removeItem("reload");
			this.read()
   		},
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/10_gntl', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					this.$router.push("login")
					return false
				}
				
				this.total = data.data.data.question_total;
				this.topicList = data.data.data[1].data[this.sub];
				this.list = data.data.data[1].data
				let testp = this.topicList.content.split("</p>")[0]
				this.thisp = testp.split("<p>")[1]
				this.thisimg = this.topicList.content.split("</p>")[1]
				
			},
			read(){
		
				if(localStorage.getItem("job") == undefined){
					localStorage.setItem("job", "basketballplayer")
					 location.reload() 
				}
			},
			toNext(a,b,c){
				localStorage.removeItem("job")
				this.react =(c -this.thisTime )/1000
				console.log(this.react)
				let data = {question_num:a,answer:b,react:this.react}
				this.dataAll.push(data)
				this.num = this.num + 1
				this.thisTime = c
				if(this.number == this.total){
					this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/10_gntl_input',{
						 data:this.dataAll,
						 api_token: window.localStorage.data
					})
					this.$router.push({
						path:'/question',
						query:{
							// num:'18;13;12',
							case:1
						}
					})
				}else{
					this.number = this.number+1
					this.sub = this.sub+1
					this.topicList = this.list[this.sub]
					let testp = this.topicList.content.split("</p>")[0]
					this.thisp = testp.split("<p>")[1]
					this.thisimg = this.topicList.content.split("</p>")[1]
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '~@/assets/style/logic-three.less';
</style>
<style  scoped>
	@import '~@/assets/style/logic-three.css';
</style>
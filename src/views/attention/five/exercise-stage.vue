<template>
	<!-- 注意游戏五（注意转移游戏）练习阶段 -->
	<!-- 头部组件：logo、暂停、退出 -->
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
			<a @click="toNext()" v-if="topicList && topicList.option" >{{topicList.option[0].triangle}}</a>
			<a @click="toNext()" v-if="topicList && topicList.option"  >{{topicList.option[1].square}}</a>
			<a @click="toNext()" v-if="topicList && topicList.option" >{{topicList.option[2].trapezoid}}</a>
			<a @click="toNext()" v-if="topicList && topicList.option" >{{topicList.option[3].diamond}}</a>
			<a @click="toNext()" v-if="topicList && topicList.option" >{{topicList.option[4].circular}}</a>
		</div>
	</section>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	export default {
		name:'AFIExercise',
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
				dataAll:[], //回传数组,
				tip:'', //标题

			}
		},
		created() {
			this.getData();
			localStorage.removeItem("reload");
			this.read()
   		},
		methods:{
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/05_zyzyyx', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					this.$router.push("login")
					return false
				}
				
				this.total = data.data.data[1][0].total_num
				this.tip =data.data.data[1][0].stage_type
				
				this.topicList = data.data.data[1][0].data[this.sub];
				this.list = data.data.data[1][0].data
				console.log(this.topicList.option[0].triangle)
			},
			read(){
		
				if(localStorage.getItem("job") == undefined){
					localStorage.setItem("job", "basketballplayer")
					 location.reload() 
				}
			},
			toNext(a,b,c){
				localStorage.removeItem("job")
				if(this.number == this.total){
					// this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/18_gzjyzh_input',{
					// 	 data:this.dataAll,
					// 	 api_token: window.localStorage.data
					// })
					this.$router.push("AFITransition")
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

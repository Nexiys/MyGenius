<template>
	<!-- 记忆游戏六（记忆复述策略）正式阶段 -->
	<!-- <section class="header">
			<div class="logo-modular">
				<a href=""><img src="../../../assets/img/logo.png" ></a>
			</div>
			<div class="h-operate">
				<a href="#"><i class="icon-pause"></i>暂停</a>
				<a href="#"><i class="icon-quit"></i>退出</a>
			</div> 
		</section> -->
		<!-- 头部组件：logo、暂停、退出 -->
		<Header />
		<section class="content-area">
			<div class="c-header">
				<div class="c-h-left">
					<em>进度：</em>
					<em>{{index>length-1?index-1:index}}</em>
					<em>/{{length-1}}</em>
				</div>
				<div class="c-h-middle"></div>
				<div class="c-h-right">
					<em>用时：</em>
					<em>02:28:00</em>
				</div>
			</div>
			<div class="topic-exploring-area">
				<h2 class="stage-tit">正式阶段</h2>
				<h2 class="guide-tit">{{contentTitle}}</h2>
				<div class="main">
					<div class="main-box not-flex">
						<div class="main-con">
							<!-- span 标签内为 content 字段中的值 -->
							<span class="question-con">{{content.content}}</span>
							<!-- input value 需要与 answer 中值作对比,正确显示笑脸,错误显示哭脸 -->
							<input autofocus type="text" class="answer-con"  v-model="answerVal"  @input="valFun()">
						</div>
					</div>
				</div>
				<a class="start-btn"  @click='btn(1,content.question_num)'>下一组</a>
			</div>
		</section>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	import TimingRing from '../../../components/TimingRing/index'
	export default {
		components: {
			Header,
			TimingRing,
		},
		name:'MSIFormal',
		data(){
			return{	
				contentTitle:'', //提示主体内容
				answerVal:'', //
				content:'',
				imgUrl1:'',
				imgUrl2:'',
				tip1:'',
				tip2:'',
				tip1Val:'',
				tip2Val:'',
				iShow:false,
				answerValhttp:'',
				index:1,
				length:0,
				disabled:false,
				content1:'',
			
				answerValhttpVal:'',
				contentTitleVal:'',
				beAnswer:'',
				dataAll:[]
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
				this.contentTitle = data.data.data.formal.question.data[this.index].title
				this.contentTitleVal = data.data.data.formal.question.data
				this.answerValhttp =data.data.data.formal.question.data[this.index].answer
				this.answerValhttpVal = data.data.data.formal.question.data
				this.content1 = data.data.data.formal.question.data
				this.content = data.data.data.formal.question.data[this.index]
				this.imgUrl1 = data.data.data.formal.question.data[this.index].if_tips.correct_icon
				this.imgUrl2 = data.data.data.formal.question.data[this.index].if_tips.wrong_icon
				this.tip1 = data.data.data.formal.question.data[this.index].if_tips.correct_tips
				this.tip2 = data.data.data.formal.question.data[this.index].if_tips.wrong_tips
				this.tip1Val = data.data.data.formal.question.data
				this.tip2Val = data.data.data.formal.question.data
				this.length = data.data.data.formal.question.data.length
				
			},
			btn(e,n){
				let data = {question_num:n,answer:this.beAnswer}
				this.dataAll.push(data)
				
					this.answerVal=''
				
					this.iShow=false
					this.index = this.index+e
					if(this.index == this.length){
							this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/11_jyfscl_input',{
							data:this.dataAll,
							api_token: window.localStorage.data
						}) 
						// this.$router.push("MSITransition")
						window.location.href="http://www.ruggear.mobi/tianshengwocai/#/question"
					}else{
						this.content = this.content1[this.index]
						this.answerValhttp = this.answerValhttpVal[this.index].answer
						this.contentTitle = this.contentTitleVal[this.index].title
						this.tip1 = this.tip1Val[this.index].if_tips.correct_tips
						this.tip2 = this.tip2Val[this.index].if_tips.wrong_tips
					}
			
			},
			valFun(){
				this.iShow = false
			
				if(this.answerVal.length>=1){
					console.log(this.answerVal)
					console.log(this.answerValhttp)
					if(this.answerVal == this.answerValhttp){
						this.iShow='tip1'
					
						this.beAnswer = 1
					}else{
						this.iShow='tip2'
					
						this.beAnswer = 0
					}

				}
			}

		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

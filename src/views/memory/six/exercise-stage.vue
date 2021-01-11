<template>
	<!-- 记忆游戏六（记忆复述策略）练习阶段 -->
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
					<em>{{index+1}}</em>
					<em>/{{length}}</em>
				</div>
				<div class="c-h-middle"></div>
				<div class="c-h-right">
					<em>用时：</em>
					<em>02:28:00</em>
				</div>
			</div>
			<div class="topic-exploring-area">
				<h2 class="stage-tit">练习阶段</h2>
				<h2 class="guide-tit">{{contentTitle}}</h2>
				<!-- <TimingRing :originProgressText ="8"></TimingRing> -->
				<div class="main">
					<!-- 正确答案,增加 success 类,错误答案,增加 wrong 类 -->
					<div class="main-box not-flex success">
						<div class="main-con">
							<!-- span 标签内为 content 字段中的值 -->
							<span class="question-con">{{content}}</span>
							<!-- input value 需要与 answer 中值作对比,正确显示笑脸,错误显示哭脸 -->
							<input autofocus type="text" class="answer-con"  v-model="answerVal" @blur="changeInput()" @input="valFun()">
						</div>
						<!-- 笑脸 or 哭脸,默认不显示（接口返回空）, src 取值 correct_icon 和 wrong_icon 字段 -->
						<img  v-if="iShow=='tip1'" src="../../../assets/img/smile.png" />
						<img  v-if="iShow=='tip2'" src="../../../assets/img/cry.png" />
						<!-- 回答正确与否,默认不显示（接口返回空）, 文字内容取值 correct_tips 和 wrong_tips 字段 -->
						<span class="tips" v-if="iShow=='tip1'">{{tip1}}</span>
						<span class="tips" v-if="iShow=='tip2'">{{tip2}}</span>
					</div>
				</div>
				<a class="start-btn" disabled @click='btn(1)'>下一组</a>
			</div>
		</section>
</template>
<script>
	import Header from '../../../components/Header/index.vue'
	import TimingRing from '../../../components/TimingRing/index.vue'
	export default {
		name:'MSIExercise',
		components: {
			Header,
			TimingRing,
		},
		data(){
			return{	
				contentTitle:'', //提示主体内容
				answerVal:'', //
				content:'',
				imgUrl1:'',
				imgUrl2:'',
				tip1:'',
				tip2:'',
				iShow:false,
				answerValhttp:'',
				index:1,
				length:0,
				disabled:false,
				content1:''
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
				this.contentTitle = data.data.data.practice.question.data[this.index].title
				this.answerValhttp =data.data.data.practice.question.data[this.index].answer
				this.content1 = data.data.data.practice.question.data
				this.content = data.data.data.practice.question.data[this.index].content
				this.imgUrl1 = data.data.data.practice.question.data[this.index].if_tips.correct_icon
				this.imgUrl2 = data.data.data.practice.question.data[this.index].if_tips.wrong_icon
				this.tip1 = data.data.data.practice.question.data[this.index].if_tips.correct_tips
				this.tip2 = data.data.data.practice.question.data[this.index].if_tips.wrong_tips
				this.length = data.data.data.practice.question.data.length
			},
			changeInput(){
				if(this.answerVal == this.answerValhttp){
					this.iShow='tip1'
				}else{
					this.iShow='tip2'
				}
			},
			btn(e){
				if(this.answerVal == ''){
					return false
				}else{
					this.answerVal=''
					this.iShow=false
					this.index = this.index+e
					if(this.index == this.length){
						this.$router.push("MSITransition")
					}else{
						this.content = this.content1[this.index].content
					}
				}
			},
			valFun(){
				this.iShow = false
			}

		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

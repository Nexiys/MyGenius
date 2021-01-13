<template>
	<!-- 记忆游戏六（记忆复述策略）正式阶段 —— 干扰项答题（有提示）-->
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
			<h2 class="stage-tit">正式阶段</h2>
			<h2 class="guide-tit">{{contentTitle}}</h2>
			<div class="main">
				<!-- 正确答案,增加 success-disturb 类,错误答案,增加 wrong-disturb 类 -->
				<div class="main-box not-flex" v-bind:class="[Tosuccess==1?'success-disturb':(Tosuccess==2?'wrong-disturb':'') ]">
					<div class="main-con">
						<!-- span 标签内为 content 字段中的值 -->
						<span class="question-con">{{content}} = </span>
						<!-- input value 需要与 answer 中值作对比,正确显示笑脸,错误显示哭脸 -->
						<input autofocus type="text" class="answer-con"  v-model="answerVal"  @input="valFun()">
					</div>
					<!-- 笑脸 or 哭脸,默认不显示（接口返回空）, src 取值 correct_icon 和 wrong_icon 字段 -->
					<img  v-if="iShow=='tip1' && tip1!==undefined" src="../../../assets/img/smile.png" />
					<img  v-if="iShow=='tip2'&& tip2!==undefined" src="../../../assets/img/cry.png" />
					<!-- 回答正确与否,默认不显示（接口返回空）, 文字内容取值 correct_tips 和 wrong_tips 字段 -->
					<span class="tips" v-if="iShow=='tip1'&& tip1!==undefined">{{tip1}}</span>
					<span class="tips" v-if="iShow=='tip2'&& tip2!==undefined">{{tip2}}</span>
				</div>
			</div>
			<a class="start-btn" v-bind:class="{ disabled: isActive }"  @click='btn(1)'>进入正式答题</a>
		</div>
	</section>
</template>

<script> 
	import Header from '../../../components/Header/index.vue'
	export default {
		name:'MSIFormalDisturb',
		components: {
			Header,
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
				tip1Val:'',
				tip2Val:'',
				iShow:false,
				answerValhttp:'',
				index:0,
				length:0,
				disabled:false,
				content1:'',
				isActive:true,
				answerValhttpVal:'',
				contentTitleVal:'',
				Tosuccess:0,
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
				this.content = data.data.data.formal.question.data[this.index].content
				this.imgUrl1 = data.data.data.formal.question.data[this.index].if_tips.correct_icon
				this.imgUrl2 = data.data.data.formal.question.data[this.index].if_tips.wrong_icon
				this.tip1 = data.data.data.formal.question.data[this.index].if_tips.correct_tips
				this.tip2 = data.data.data.formal.question.data[this.index].if_tips.wrong_tips
				this.tip1Val = data.data.data.formal.question.data
				this.tip2Val = data.data.data.formal.question.data
				this.length = data.data.data.formal.question.data.length
				
			},
			btn(e){
				if(this.answerVal !==''){
					this.$router.push("msiformal")
				}
				
				this.Tosuccess = 0
			},
			valFun(){
				this.Tosuccess = 0
				this.iShow = false
				this.isActive = true
				if(this.answerVal.length>=1){
					console.log(this.answerVal)
					console.log(this.answerValhttp)
					if(this.answerVal == this.answerValhttp){
						this.iShow='tip1'
						this.isActive = false
						this.Tosuccess = 1
					}else{
						this.iShow='tip2'
						this.isActive = false
						this.Tosuccess = 2
					}
				}
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
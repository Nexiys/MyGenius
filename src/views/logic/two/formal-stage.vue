<template>
	<!-- 逻辑游戏二（演绎推理）正式阶段 -->
	<section class="header">
		<div class="logo-modular">
			<a href="#"><img src="../../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section>
	<section class="apart-body">
		<div class="apart-top">
			<div class="content-header">
				<div class="left">
					<span>进度：</span>
					<span>0</span>
					<span>/12</span>
				</div>
				<div class="right">
					<span>用时：</span>
					<span>02:28:00</span>
				</div>
			</div>
			
			<div class="question">
				<span class="answer-guide">请推理出正确答案并选择</span>
				<div class="question-box">
					<p>1、达芬奇是哲学家，达芬奇也是画家，所以（     ）</p>
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<a href="#">A、哲学家大部分都是画家</a>
			<a href="#">B、画家中绝大部分是哲学家</a>
			<a href="#">C、有的哲学家是画家</a>
			<a href="#">D、由所给内容推不出任何结论</a>
		</div>
	</section>
</template>

<script>
	export default {
		name:'LTFormal',
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
				num:1,
				maxnum:1,
				dataAll:[],
				thisTime:new Date().getTime(),
				react:0,
			}
		},
		created() {
			this.getData();
		},
		methods:{

			getSecondByDateSub(begin,end) {
				var beginDate  = new Date(begin);
				var endDate = new Date(end);
				var diff = endDate.getTime() - beginDate.getTime();
				var sec = diff /1000;
				return  sec ;
			},
			async getData(){
				const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/08_bxyx', {params: {api_token: window.localStorage.data},})
				if(data.data.code !== 200){
					console.log("数据获取失败！");
					this.$router.push("login")
					return false
				}
				// 阶段标题
				this.stage_tit = data.data.data[2].stage_tit;
				let stage_tit = this.stage_tit;
				console.log(stage_tit)
				// 答题阶段指导标题
				this.answer_guide = data.data.data[2].answer_guide;
				let answer_guide = this.answer.answer_guide;
				// console.log(data.data.data[1].data)
				this.newData = data.data.data[2].data
				this.dataList = data.data.data[2].data


				this.maxnum = this.newData.length
				console.log(this.maxnum)
				this.dataList =this.dataList[this.index] 
			},
			toNext(a,b,c){
				this.react =(c -this.thisTime )/1000
				console.log(this.react)
				let data = {question_num:a,answer:b,react:this.react}
				this.dataAll.push(data)
				this.num = this.num + 1
				this.thisTime = c
				if(a == this.newData.length){
					 this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/08_bxyx_input',{
						 data:this.dataAll,
						 api_token: window.localStorage.data
					 } )
					 window.location.href="http://www.ruggear.mobi/tianshengwocai/#/question"
				}else{
					this.dataList = this.newData[a]
				}

			}
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/logic-two.less';
</style>

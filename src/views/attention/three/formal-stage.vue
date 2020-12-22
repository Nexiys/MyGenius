<template>
	<!-- 注意游戏三（注意稳定性游戏）正式答题阶段 -->
	<section class="header">
		<div class="logo-modular">
			<!-- <a href=""><img src="../../assets/img/logo.png" ></a> -->
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
				<em>{{page>=6?page-1:page}}</em>
				<em>/{{pagenum}}</em>
			</div>
			<div class="c-h-middle"></div>
			<div class="c-h-right">
				<em>用时：</em>
				<em>02:28:00</em>
			</div>
		</div>
		<div class="topic-exploring-area">
			<h2 class="stage-tit">{{stage_tit}}</h2>
			<h2 class="guide-tit">{{guide_tit}}</h2>
			<div class="timing-ring-wrap">{{time_limit}}</div>
			<!-- 答题页面中,下面元素需要添加 flex 样式 -->
			<div class="main flex">
				<!-- 增加一层 answer-area , 方便布局 -->
				<ul class="answer-area">
					<!-- 获得焦点行<li>添加 .focus-line 样式 -->
					<li class="focus-line">
						<div class="topic">
							<span v-for="(item,i) in answer">{{item}}</span>
						</div>
						<div class="solution">
							<input  @blur="nex(index)" autofocus type="tel" maxlength="1"  v-for="(item,index) in answer" class="border-input" @keyup="nextFocus($event,index)">
							

						</div>
						
						<!-- <div class="solution" >
							<input type="text" v-for="(item,index) in answer"  class="border-input" @keyup="nextFocus($event,index)">
						</div> -->

					</li>
					<li v-for="(item,i) in lastanswer">
						<div class="topic">
							<span v-for="(listitem,i) in item">{{listitem}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "formalstage",
		data(){
			return{
				thisindex:0,
				answer:[],
				lastanswer:[],
				content:[],
				page:1,
				pagenum:0,
				model:[],
				datalist:[],
				des_con:'',
				guide_tit:'',
				stage_tit:'',
				time_limit:'',
				
			}
		},
		created(){
			this.getData()
        },
		methods:{
			async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
                    console.log("获取数据失败")
                    return false
				}
				this.stage_tit=data.data.data[2].stage_tit	
				this.des_con = data.data.data[2].des_con
				this.guide_tit =data.data.data[2].guide_tit
				this.time_limit = data.data.data[2].time_limit

				this.pagenum = data.data.data[2].data.answer.length;
				this.answer = data.data.data[2].data.answer[this.thisindex]
				this.datalist = data.data.data[2].data.answer
				
				this.lastanswer = data.data.data[2].data.answer.splice(1)
						
			},

			nex(i){
				
				this.model=[]
				var a = document.getElementsByTagName("input");
	            for (var i = 0; i < a.length; i++) {
	                if (a[i].value !== "") {
					 this.model.push(i)
	                }
	            }
				if(this.model.length==19){
					this.page = this.page+1
					var a = document.getElementsByTagName("input");
		            for (var i = 0; i < a.length; i++) {
		                 a[i].value='';
		            }
					this.answer = this.lastanswer[this.thisindex]
					this.lastanswer =this.lastanswer.splice(1)
					if(this.page == 6){
						this.$router.push("befinished")
					}
				} 
			},

			nextFocus(el,index) {
                var dom = document.getElementsByClassName("border-input"),
                    currInput = dom[index],
                    nextInput = dom[index + 1],
					lastInput = dom[index - 1];

                /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
                if (el.keyCode != 8) {
                    if (index < (this.answer.length - 1)) {
                        nextInput.focus();
                    } else {
                        currInput.blur();
                    }
                }else{
                    if (index !=0) {
                        lastInput.focus();
                    }
                }
 
            },
		},
	}	

</script>

<style lang="less">
	@import '~@/assets/style/attention-three.less';
</style>


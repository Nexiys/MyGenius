<template>
	<!-- 注意游戏三（注意稳定性游戏）正式答题阶段 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
	<Header />
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
			<h2 class="guide-tit">{{answer_guide}}</h2>
			<timing v-if="update" :originProgressText ="timelimit"  class="timling"></timing>
			<!-- 答题页面中,下面元素需要添加 flex 样式 -->
			<div class="main flex">
				<!-- 增加一层 answer-area , 方便布局 -->
				<ul class="answer-area">
					<!-- 获得焦点行<li>添加 .focus-line 样式 -->
					<li class="focus-line">
						<div class="topic">
							<span v-for="(item,i) in content">{{item}}</span>
						</div>
						<div class="solution">
							<input @blur="nex(index)" autofocus type="tel" maxlength="1"  v-for="(item,index) in answer" class="border-input" @keyup="nextFocus($event,index)" oninput="value=value.replace(/[^\d]/g,'')">							
						</div>
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
	</div>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
  import timing from '../../../components/TimingRing/index'
	export default {
		components: {
			Header,
			timing,
		},
		name: "formalstage",
		data(){
			return{
				thisindex:0,
				answer:[],
				lastanswer:[],
				page:1,
				pagenum:0,
				datalist:[],
				des_con:'',
				guide_tit:'',
				answer_guide:'',
				stage_tit:'',
				time_limit:'',	
				content:[],
				timelimit:60,
				model : 0,
				timer:null,
				update:true,
				answerVal:'',
				inputVal:'',
				dataAll:[],
				datago:[]
			}
		},
		created(){	
			this.getData()
			this.timeFun()
		},
		methods:{
			async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
                    console.log("获取数据失败")
                    this.$router.push("login")
				}
				this.stage_tit=data.data.data[2].stage_tit	
				this.des_con = data.data.data[2].des_con
				this.guide_tit =data.data.data[2].guide_tit
				this.answer_guide =data.data.data[2].answer_guide
				this.time_limit = data.data.data[2].time_limit

				this.pagenum = data.data.data[2].data.answer.length;
				this.answer = data.data.data[2].data.answer[this.thisindex]
				this.answerVal = data.data.data[2].data.answer
				this.content = data.data.data[2].data.content[this.thisindex]
				this.datalist = data.data.data[2].data.content
				this.lastanswer = data.data.data[2].data.content.splice(1)
				
						
			},
			timeFun() {
				let time = this.timelimit;
				this.timer = setInterval(() => {
					if (time <= 1) {
						clearInterval(this.timer);
						time = this.timelimit
						this.timeFun()
						this.page = this.page+1
						var a = document.getElementsByTagName("input");
						
			            for (var i = 0; i < a.length; i++) {
			                 a[i].value='';
							 a[0].focus()
							 console.log(a[i].value)
			            }
						
						this.answer = this.answerVal[this.thisindex]
						this.content = this.datalist[this.thisindex]
						this.lastanswer =this.lastanswer.splice(1)
						if(this.page == 6){
							this.$router.push("AFIntroduce")
						}
					} else {
						time--;
						//console.log(time)
					}
				},1000);
			},
			nex(i){
				
				this.model=0
				var a = document.getElementsByTagName("input");
				let data = {question_num:i+1,answer:a[i].value==this.answer[i]?1:0}
				this.dataAll.push(data)
			
	            for (var i = 0; i < a.length; i++) {
	                if (a[i].value == "") {
					 this.model=1
	                }
	            }
				if(this.model==0){
					this.datago.push(this.dataAll)
					this.dataAll = []
					console.log(this.datago)
					clearInterval(this.timer);
					this.timeFun()
					this.page = this.page+1
					var a = document.getElementsByTagName("input");
		            for (var i = 0; i < a.length; i++) {
		                 a[i].value='';
						a[0].focus()
		            } 
					this.update = false
					this.$nextTick(() => {
						this.update = true
					})
					this.answer = this.answerVal[this.thisindex]
					this.content = this.datalist[this.thisindex]
					this.lastanswer =this.lastanswer.splice(1)
					if(this.page == 6){
						this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx_input',{
							data:this.datago,
							api_token: window.localStorage.data
						}) 
						this.$router.push("AFIntroduce")
						localStorage.removeItem("reload");
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
		mounted:function(){
			if(localStorage.getItem("reload") == undefined){
				localStorage.setItem('reload',2)
				location.reload()
			}
			
		}
	}	

</script>

<style lang="less" scoped>
	@import '~@/assets/style/attention-three.less';
</style>

<style  scoped>
	@import '~@/assets/style/attention-three.css';
</style>
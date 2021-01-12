<template>
	<!-- 注意游戏三（注意稳定性游戏）练习阶段 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<Header />
	<section class="content-area">
		<div class="c-header">
			<div class="c-h-left">
				<em>进度：</em>
				<em>0</em>
				<em>/00</em>
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
			<timing :originProgressText ="timelimit"  class="timling"></timing>
			<!-- 答题页面中,下面元素需要添加 flex 样式 -->
			<div class="main flex">
				<!-- 增加一层 answer-area , 方便布局 -->
				<ul class="answer-area">
					<li class="focus-line">
						<div class="topic">
							<span v-for="(item,i) in content">{{item}}</span>
						</div>
						<div class="solution">
							<input  @blur="nex(index)" autofocus type="tel" maxlength="1"  v-for="(item,index) in answer" class="border-input" @keyup="nextFocus($event,index)" oninput="value=value.replace(/[^\d]/g,'')">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
  import timing from '../../../components/TimingRing/index'
	import Header from '../../../components/Header/index.vue'
	export default {
		components: {
			Header,
			timing,
		},
		name: "exercisrstage",
		data(){
			return{
				des_con:'',      // 题型说明内容
				guide_tit:'',    // 指导标题
				stage_tit:'',    // 阶段标题
				answer_guide:'', // 答题阶段指导标题
				time_limit:'',   // 时间限制
				content:[],      // 问题数组
				answer:[],       // 答案数组
				model:0,         // Model 
				timelimit:30     // 限时时间
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
					this.$router.push("login")
                    return false
				}
				this.stage_tit = data.data.data[1].stage_tit	
				this.des_con = data.data.data[1].des_con
				this.guide_tit = data.data.data[1].guide_tit
				this.answer_guide = data.data.data[1].answer_guide
				this.time_limit = data.data.data[1].time_limit
				this.content = data.data.data[1].data.content[0]
				this.answer = data.data.data[1].data.answer[0]
			},

			nex(i){

				this.model=0
				var a = document.getElementsByTagName("input");
	            for (var i = 0; i < a.length; i++) {
	                if (a[i].value == "") {
					 this.model=1
	                }
	            }
				if(this.model == 0){
					this.$router.push("transitionpage")
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
</script>>

<style lang="less" scoped>
	@import '~@/assets/style/attention-three.less';
</style>

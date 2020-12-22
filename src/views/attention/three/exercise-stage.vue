<template>
	<!-- 注意游戏三（注意稳定性游戏）练习阶段 -->
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
			<h2 class="guide-tit">{{guide_tit}}</h2>
			<div class="timing-ring-wrap">{{time_limit}}</div>
			<!-- 答题页面中,下面元素需要添加 flex 样式 -->
			<div class="main flex">
				<!-- 增加一层 answer-area , 方便布局 -->
				<ul class="answer-area">
					<li class="focus-line">
						<div class="topic">
							<span v-for="(item,i) in answer">{{item}}</span>

						</div>
						<div class="solution">
							<input  @blur="nex(index)" autofocus type="tel" maxlength="1"  v-for="(item,index) in answer" class="border-input" @keyup="nextFocus($event,index)">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		mounted() {
		this.$nextTick(function () {
			this.$refs.id.onfocus()
		})		
		const n = document.createElement('script');
		n.type = 'text/javascript';
		n.src = 'http://apps.bdimg.com/libs/jquery/2.1.1/jquery.js';
		document.body.appendChild(n);	
		},
		name: "exercisrstage",
		data(){
			return{
				des_con:'',
				guide_tit:'',
				stage_tit:'',
				time_limit:'',
				answer:[],
				model:0
			}
		},
		created(){
			
			this.getData()
			//alert($('input'))
			 
        },
		methods:{
			async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/02_zywdxyx', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
					console.log("获取数据失败")
					this.$router.push("login")
                    return false
				}
				this.stage_tit=data.data.data[1].stage_tit	
				this.des_con = data.data.data[1].des_con
				this.guide_tit =data.data.data[1].guide_tit
				this.time_limit = data.data.data[1].time_limit
				this.answer = data.data.data[1].data.answer[0]
			},

			nex(i){
				console.log(i)
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
		directives: {
			// 注册一个局部的自定义指令 v-focus
			focus: {
			// 指令的定义
			inserted: function(el) {
				// 聚焦元素
				el.querySelector("input").focus();
			}
			}
		}
	}	
</script>>

<style lang="less">
	@import '~@/assets/style/attention-three.less';
</style>

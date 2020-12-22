<template>
	<!-- 人格测评题型页面 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section>
    <section class="e-body" v-if="isShow==1">
        <section id="evaluation">
            <div class="e-header">
                <div class="e-h-left">
                    <em>进度：</em>
                    <em>{{pageMin==81?80:pageMin}}</em>
                    <em>/{{pageNum}}</em>
                </div>
                <div class="e-h-right">
                    <em>用时：</em><em>02:28:00</em>
                </div>
            </div>
            <div class="e-tips-1">
                <em v-html="des"></em>
            </div>
            <div class="questions-1">
                <em>{{questionList.content}}</em>
            </div>
        </section>
        <section class="answer">
            <a href="#"  @click="toNext(questionList.dimension_1,1,questionList.cate_1,questionList.question_num,questionList.score_1,questionList.type)">{{questionList.option_1}}</a>
            <a href="#"  @click="toNext(questionList.dimension_2,1,questionList.cate_2,questionList.question_num,questionList.score_2,questionList.type)">{{questionList.option_2}}</a>
            <a href="#" v-if="questionList.option_3"  @click="toNext(questionList.dimension_3,1,questionList.cate_3,questionList.question_num,questionList.score_3,questionList.type)">{{questionList.option_3}}</a>
            <a href="#"  v-if="questionList.option_4"  @click="toNext(questionList.dimension_4,1,questionList.cate_4,questionList.question_num,questionList.score_4,questionList.type)">{{questionList.option_4}}</a>
            <a href="#"  v-if="questionList.option_5"  @click="toNext(questionList.dimension_5,1,questionList.cate_5,questionList.question_num,questionList.score_5,questionList.type)">{{questionList.option_5}}</a>
            <a href="#"  v-if="questionList.option_6"  @click="toNext(questionList.dimension_6,1,questionList.cate_6,questionList.question_num,questionList.score_6,questionList.type)">{{questionList.option_6}}</a>
        </section>
    </section>
<!-- 第一阶段 -->
    <section class="content-area" v-if="isShow==2">
        <div class="c-header">
            <div class="c-h-left">
                <em>进度：</em>
                <em>{{pageMin}}</em>
                <em>/{{pageNum}}</em>
            </div>
            <div class="c-h-middle"></div>
            <div class="c-h-right">
                <em>用时：</em>
                <em>02:28:00</em>
            </div>
        </div>
        
        <div class="exercise-end-content">
            <img src="../../assets/img/fist.png" alt="">
            <h1>再接再厉</h1>
            <div class="explain">
                <p>非常好！完成第一阶段测评～</p>		
            </div>
            <div class="rule">
                <p v-html="des"></p>
            </div>
            <a href="#" @click="sClick(1)">进入第二阶段测评</a>
        </div>
    </section>
<!-- 第二阶段 -->
    <section class="content-area" v-if="isShow==3">
        <div class="c-header">
            <div class="c-h-left">
                <em>进度：</em>
                <em>{{pageMin}}</em>
                <em>/{{pageNum}}</em>
            </div>
            <div class="c-h-middle"></div>
            <div class="c-h-right">
                <em>用时：</em>
                <em>02:28:00</em>
            </div>
        </div>
        
        <div class="exercise-end-content">
            <img src="../../assets/img/reaction.png" alt="">
            <h1>非常好</h1>
            <div class="explain">
                <p>非常好！完成第二阶段测评～</p>		
            </div>
            <div class="rule">
                <p v-html="des"></p>
            </div>
            <a href="#" @click="sClick(1)">开始测评</a>
        </div>
    </section>
<!-- 完成 -->

</template>
<script>
	export default {
		name: "quiet",
		data(){
			return{       
                isShow:1,
                page: 0, // 当前页 
                des:'',     //题型描述
                questionTip:'', // 题目数据
                questionList:[],
                quesTest:[],
                quesLength:0,
                quesData:[],
                num:parseInt(sessionStorage.getItem('num')), //选项数据默认下标
                desnum:parseInt(sessionStorage.getItem('desnum')), //题型描述默认下标
                quesDataList:[],//回传
                pageNum:'',
                pageMin:1

			}
		},
		created(){
            this.getData()
        },
		methods:{
            // 获取数据           
            async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/00_rgqxcp', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
                    console.log("获取数据失败")
                    return false
                }
                this.pageNum = data.data.question_total
                if(this.desnum == 4){
                    this.axios.post('http://www.ruggear.mobi/api/v0.9/evaluation/00_rgqxcp_2_input', {api_token: window.localStorage.data,data:this.quesDataList})
                    this.$router.push("threeindex")
                } 
                this.isShow = this.desnum
                if(this.isShow==3 || this.isShow==2){
                    let time = 3;
                    let timer = setInterval(() => {
                        if (time == 0) {
                            clearInterval(timer);
                            this.isShow = 1
                        } else {
                            time--;
                        }
                    },1000);
                }
                if(this.desnum <= 3){   
                //拿到数据默认显示第一条
                this.quesData = data.data.data // 所有题数据 
                this.quesTest =this.quesData[this.desnum].data 
                //console.log(this.quesTest)
                this.questionList =this.quesTest[this.num] //选项
                this.des = data.data.data[this.desnum].des
                this.quesLength =data.data.data[this.desnum].data.length
                }

            },
            //下一页
            toNext(e,f,j,h,n,b){

                this.quesDataList.push({
                    question_num:h,
                    dimension:e,
                    cate:j== undefined? 1: j,
                    score:n== undefined? 1: n,
                    type:this.desnum
                });
                this.pageMin = this.pageMin+1
                //console.log(this.num+":"+this.quesLength)
                if(this.num == this.quesLength-1){
                    this.desnum = this.desnum+1
                    
                    this.num = 0
                    
                    this.getData()
               
                }else if(this.num <= this.quesLength-1){
                    this.num = f+this.num
                    this.questionList = this.quesTest[this.num]
                }
            },

            sClick(e){
                this.isShow = e
            }
		},
	}
</script>

<style lang="less">
    @import '~@/assets/style/personaliy.less';
</style>
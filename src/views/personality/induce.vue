<template>
	<!-- 人格测评介绍页面 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section>
    <section class="content-area-induce">
         <div class="c-header">
            <div class="c-h-left">
                <em>进度：</em>
                <em>0</em>
                <em>/{{num}}</em>
            </div>
            <div class="c-h-middle"></div>
            <div class="c-h-right">
                <em>用时：</em>
                <em>02:28:00</em>
            </div>
        </div>
        <div class="tips-content">
            <div class="tips-info">
                <h2>人格倾向测评</h2>
                <p v-html="title"></p>
                <router-link to="/quiet" @click="desnum()">开始测评</router-link>
            </div>
        </div>
    </section>
</template>
<script>
	export default {
		name: "one",
		data(){
			return{
                title:'',
                num:''
			}
		},
		created(){
            this.getData()
        },
		methods:{
            async getData(){
                const data = await this.axios.get('http://www.ruggear.mobi/api/v0.9/evaluation/00_rgqxcp', {params: {api_token: window.localStorage.data},})
                if(data.data.code !== 200){
                    console.log("获取数据失败")
                    localStorage.removeItem('data');
                    this.$router.push("login")
                }
                this.title=data.data.introduce.introductions
                this.num = data.data.question_total
            },            
			desnum(){
                sessionStorage.setItem("desnum",1)
                sessionStorage.setItem("num",0)
            }
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/personaliy.less';
</style>
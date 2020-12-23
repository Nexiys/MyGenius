<template>
	<!-- 测评完成页面 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div>
	</section>
	<section class="content-area">
		<div class="exercise-end-content">
			<img src="../../assets/img/finished.png" alt="">
			<h1>恭喜测评完成！</h1>
			<div class="rule">
				<p>你的测评结果已经提交，我们的专家团队正在进行专业分析，通过精准专家解读，为你提供详细的个性化测评报告。</p>
			</div>
			<a href="http://www.ruggear.mobi/tianshengwocai/#/report" class="button-default">查看报告</a>
		</div>
		
	</section>
</template>
<script>
	export default {
		name: "befinished",
		data(){
			return{

			}
		},
		created(){
            
        },
		methods:{
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/finished.less';
</style>
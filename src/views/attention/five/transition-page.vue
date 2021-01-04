<template>
	<!-- 注意游戏五（注意转移性游戏）过渡页面 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../../assets/img/logo.png" ></a>
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
		
		<div class="exercise-end-content">
		    <img src="../../../assets/img/reaction.png" alt="">
		    <h1>非常好</h1>
		    <div class="explain">
		        <p>练习结束，正式游戏开始。<br/>请尽可能快速准确地完成游戏～</p>		
		    </div>
			<router-link to="topicexploring">开始游戏</router-link>
		</div>
	</section>
</template>

<script>
	export default {
		name: "AFITransition",
	}
</script>

<style lang="less">
	@import '~@/assets/style/attention-three.less';

</style>

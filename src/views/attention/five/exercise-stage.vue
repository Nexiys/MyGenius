<template>
	<!-- 注意游戏五（注意）练习阶段 -->
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
					<span>/00</span>
				</div>
				<div class="right">
					<span>用时：</span>
					<span>02:28:00</span>
				</div>
			</div>
			
			<div class="question">
				<span class="stage-tit">练习阶段</span>
				<span class="answer-guide">请判断屏幕中出现图形的形状或颜色并快速点击选择</span>
				<div class="question-box">
					<!-- <img src='http://www.ruggear.mobi/img/zyzyyx/circular.png' /> -->
					<p>8&nbsp;7</p>
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<a href="#">A、&nbsp;&nbsp;<img src ='../../../assets/img/induce-01A.png' /></a>
			<a href="#">B、&nbsp;&nbsp;<img src ='../../../assets/img/induce-01B.png' /></a>
			<a href="#">C、&nbsp;&nbsp;<img src ='../../../assets/img/induce-01C.png' /></a>
			<a href="#">D、&nbsp;&nbsp;<img src ='../../../assets/img/induce-01D.png' /></a>
		</div>
	</section>
</template>

<script>
	export default {
		name:'AFIExercise',
	}
</script>

<style lang="less">
	@import '~@/assets/style/attention-five.less';
</style>

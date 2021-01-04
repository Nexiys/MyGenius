<template>
	<!-- 记忆游戏六（记忆复述策略）练习阶段 -->
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
					<!-- 此处 img/p 取自 content 字段的值 -->
					<img src='http://www.ruggear.mobi/img/zyzyyx/circular.png' />
					<!-- <p>8&nbsp;7</p> -->
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<a href="#">三角形</a>
			<a href="#">正方形</a>
			<a href="#">梯形</a>
			<a href="#">菱形</a>
			<a href="#">圆形</a>
		</div>
	</section>
</template>

<script>
	export default {
		name:'MSIExercise',
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

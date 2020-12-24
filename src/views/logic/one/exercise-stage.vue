<template>
	<!-- 逻辑游戏一（表象游戏）练习阶段 -->
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
			
			
		</div>
		<div class="apart-bottom">
			
		</div>
	</section>
</template>

<script>
	export default {
		name:'LOExercise'
	}
</script>

<style lang="less">
	@import '~@/assets/style/logic-one.less';
</style>

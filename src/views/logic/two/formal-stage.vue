<template>
	<!-- 逻辑游戏二（演绎推理）正式阶段 -->
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
					<span>/12</span>
				</div>
				<div class="right">
					<span>用时：</span>
					<span>02:28:00</span>
				</div>
			</div>
			
			<div class="question">
				<span class="answer-guide">请推理出正确答案并选择</span>
				<div class="question-box">
					<p>1、达芬奇是哲学家，达芬奇也是画家，所以（     ）</p>
				</div>
			</div>
		</div>
		<div class="apart-bottom">
			<a href="#">A、哲学家大部分都是画家</a>
			<a href="#">B、画家中绝大部分是哲学家</a>
			<a href="#">C、有的哲学家是画家</a>
			<a href="#">D、由所给内容推不出任何结论</a>
		</div>
	</section>
</template>

<script>
	export default {
		name:'LTFormal',
	}
</script>

<style lang="less">
	@import '~@/assets/style/logic-two.less';
</style>

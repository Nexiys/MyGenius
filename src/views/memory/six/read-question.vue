<template>
	<!-- 记忆游戏六（记忆复述策略）学习阶段 -->
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
		<div class="topic-exploring-area">
			<h2 class="stage-tit">练习阶段</h2>
			<h2 class="guide-tit">请先认真读题</h2>
			<div class="main">
				<div class="main-box">
					<p class="des-con">请您在屏幕中出现的“线索——目标”词对应的右侧方框中输入目标词
输入后按下“下一组”按钮，跳转至下一组线索词</p>
				</div>
			</div>
			<router-link class="start-btn" to="msiexercise">开始游戏</router-link>
		</div>
	</section>
</template>

<script>
	export default {
		name:'MSIRead',
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

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
			<h2 class="guide-tit">请您学习看到的“线索—目标”配对词组</h2>
			<TimingRing :originProgressText ="60"></TimingRing>
			<div class="main">
				<div class="main-box">
					<div class="container">
						<div class="prev"><i class="icon-page-left"></i></div>
						<div class="study-con"></div>
						<ul class="page-num">
							<li class="num">1</li>
							<li class="num">2</li>
						</ul>
						<div class="next"><i class="icon-page-right"></i></div>
					</div>
				</div>
			</div>
			<router-link class="start-btn" to="msiread">进入测试</router-link>
		</div>
	</section>
</template>

<script>
	import TimingRing from '../../../components/TimingRing/index'
	export default {
		components: { TimingRing },
		name:'MSIStudy',
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

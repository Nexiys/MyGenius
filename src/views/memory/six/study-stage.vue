<template>
	<!-- 记忆游戏六（记忆复述策略）学习阶段 -->
	<!-- <section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section> -->
	<!-- 头部组件：logo、暂停、退出 -->
	<Header />
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
						<div class="study-con">
							<span>文化 - 教育</span>
							<span>今天 - 明天</span>
							<span>良师 - 益友</span>
							<span>工人 - 农民</span>
							<span>报刊 - 书籍</span>
							<span>报纸 - 杂志</span>
							<span>老师 - 同学</span>
							<span>电脑 - 硬件</span>
							<span>企业 - 论坛</span>
							<span>市场 - 产品</span>
							<span>调查 - 研究</span>
							<span>关心 - 支持</span>
						</div>
						<div class="next"><i class="icon-page-right"></i></div>
					</div>
					<ul class="page-num">
						<li class="num focus">1</li>
						<li class="num">2</li>
					</ul>
				</div>
			</div>
			<router-link class="start-btn" to="msiread">进入测试</router-link>
		</div>
	</section>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	import TimingRing from '../../../components/TimingRing/index'
	export default {
		components: { 
			TimingRing,
			Header,
		},
		name:'MSIStudy',
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>

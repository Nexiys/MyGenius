<template>
	<!-- 逻辑游戏一（表象游戏）过渡页面 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
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
		
		<div class="exercise-end-content">
		    <img src="../../../assets/img/reaction.png" alt="">
		    <h1>非常好！</h1>
		    <div class="explain">
		        <p>练习结束，正式游戏开始。<br/>请尽可能快速准确地完成游戏～</p>
		    </div>
			<router-link to="loformal">开始游戏</router-link>
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../../components/Header/index.vue'
	export default {
		name: "LOTransition",
		components: {
			Header,
		},
	}	
</script>

<style lang="less" scoped>
	@import '~@/assets/style/logic-one.less';
</style>
<style  scoped>
	@import '~@/assets/style/logic-one.css';
</style>
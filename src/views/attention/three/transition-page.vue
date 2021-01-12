<template>
	<!-- 注意游戏三（注意稳定性游戏）过渡页面 -->
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
		
		<div class="exercise-end-content">
		    <img src="../../../assets/img/reaction.png" alt="">
		    <h1>非常好</h1>
		    <div class="explain">
		        <p>练习结束，正式游戏开始。<br/>请尽可能快速准确地完成游戏～</p>		
		    </div>
			<router-link to="topicexploring">开始游戏</router-link>
			<!-- <timing :originProgressText ="timelimit" :timeFun = "kais" class="timling"></timing> -->
		</div>
	</section>
</template>

<script>
	import timing from '../../../components/TimingRing/index'
	import Header from '../../../components/Header/index.vue'
	export default {
		components: {
			Header,
			timing,
		},
		name: "transitionpage",
		data(){
			return{
				timelimit:3
			}
		},
		created(){
localStorage.removeItem("reload");
        },
		methods:{
		},
	}	
</script>

<style lang="less" scoped>
	@import '~@/assets/style/attention-three.less';

</style>

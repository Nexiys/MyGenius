<template>
	<section class="transitionPage">
		<img src="../../assets/img/reaction.png" alt="">
		<h1>非常好</h1>
		<div class="explain">
		    <p>练习结束，正式游戏开始。<br/>请尽可能快速准确地完成游戏～</p>		
		</div>
		<button class="button-default">开始答题</button>
	</section>
</template>

<script>
	export default {
		name: "TransitionPage"
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.transitionPage {
		width: 100%;
		height: auto;
		margin: 0 auto;
		text-align: center;
		& > img {
			width: 150px;
			height: 150px;
			margin-top: 100px;
		}
		& > h1 {
			font-size: 32px;
			font-weight: 600;
			color: @text-minor;
			margin: 24px auto 30px;
		}
		.explain {
			text-align: center;
			p {
				font-size: 22px;
				line-height: 34px;
				color: @text-color;
			}
		}
		button {
			margin: 40px auto 0;
			border-radius: 4px;
			padding: 18px 92px;
			font-size: 24px;
			line-height: 24px;
			color: @white;
		}
	}
</style>

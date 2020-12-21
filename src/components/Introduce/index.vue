<template>
	<section class="introduce">
		<div class="in-left">
			<img src="../../assets/img/matters-needing-attention.png">
		</div>
		<div class="in-right">
			<h2>人格倾向测评</h2>
			<p>接下来，你将看到三组题目，请分别按照要求作答。第一阶段题目中，你将看到一组题目，请选择哪一答案最接近地描述了你通常的思考和行为方式。</p>
			<button class="button-default">开始答题</button>
		</div>
	</section>
</template>

<script>
	export default {
		name: "Introduce"
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.introduce {
		display: flex;
		align-items: center;
		margin: 125px 60px 172px;
		.in-left {
			flex: 0 0 380px;
			height: 380px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.in-right {
			position: relative;
			display: flex;
			flex-flow: row wrap;
			align-content: space-between;
			width: 610px;
			height: 380px;
			padding: 46px 40px;
			margin-left: 80px;
			background: @introduce-bg;
			border-radius: 8px;
			h2 {
				margin: 0 auto;
				font-size: 32px;
				font-weight: 600;
				line-height: 32px;
				color: @introduce-tit;
			}
			p {
				font-size: 22px;
				line-height: 34px;
				color: @introduce-con;
			}
			button {
				margin: 0 auto;
				border-radius: 4px;
				padding: 18px 92px;
				font-size: 24px;
				line-height: 24px;
				color: @white;
			}
			&::after {
				position: absolute;
				top: 60px;
				left: -15px;
				width: 30px;
				height: 30px;
				background: @introduce-bg;
				content: '';
				transform: rotate(45deg);
			}
		}
	}
</style>

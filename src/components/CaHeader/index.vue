<template>
	<section class="caHeader">
		<div class="progress">
			<span>进度：</span>
			<span>0</span>
			<span>/80</span>
		</div>
		<div class="time">
			<span>用时：</span>
			<span>02:28:00</span>
		</div>
	</section>
</template>

<script>
	export default {
		name: "CaHeader"
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.caHeader {
		display: flex;
		align-items: center;
		margin: 0 30px;
		height: 60px;
		border-bottom: 1px solid @hr-color;
		.progress,.time {
			font-size: 16px;
			flex-grow: 1;
			line-height: 1;
			color: @text-secondary;
		}
		.progress {
			text-align: left;
			span{
				&:nth-child(2) {
					color: @normal-blue;
				}
			}
		}
		.time {
			text-align: right;
		}
	}
</style>

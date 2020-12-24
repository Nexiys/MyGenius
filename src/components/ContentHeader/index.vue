<template>
	<section class="content-header">
		<div class="left">
			<span>进度：</span>
			<span>0</span>
			<span>/80</span>
		</div>
		<div class="right">
			<span>用时：</span>
			<span>02:28:00</span>
		</div>
	</section>
</template>

<script>
	export default {
		name: "ContentHeader"
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.content-header {
		display: flex;
		align-items: center;
		width: calc(~"100% - 60px");
		height: 60px;
		margin: 0 auto;
		border-bottom: 1px solid @hr-color;
		.left,.right {
			font-size: 16px;
			flex-grow: 1;
			line-height: 1;
			color: @text-secondary;
		}
		.left {
			text-align: left;
			span{
				&:nth-child(2) {
					color: @normal-blue;
				}
			}
		}
		.right {
			text-align: right;
		}
	}
</style>

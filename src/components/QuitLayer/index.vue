<template>
	<section class="quitLayer">
		
	</section>
</template>

<script>
	export default {
		name: "QuitLayer",
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.quitLayer {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url(../../assets/img/trapezoid.png) repeat;
		filter: 10px;
	}
</style>

<template>
	<section class="background"></section>
</template>

<script>
	export default {
		name: "Background"
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.background {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: calc(~"100% - 70px");
		background: @white url(../../assets/img/evaluation-bg.png) no-repeat;
		background-size: cover;
	}
</style>

<template>
	<section class="contentArea"></section>
</template>

<script>
	export default {
		name: "ContentArea"
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.contentArea {
		margin: 0 auto;
		width: 1180px;
		height: 760px;
		background: @white;
		box-shadow: 0 20px 40px -10px rgba(33,120,215,0.40);
		border-radius: 8px;
	}
</style>

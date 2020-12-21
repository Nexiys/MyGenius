<template>
	<header class="header">
		<div class="logo">
			<img src="../../assets/img/LOGO-1.png" alt="天生我才测评系统">
		</div>
		<div class="buttons">
			<button class="button-default-white">
				<i class="icon-pause"></i>
				<span>暂停</span>
			</button>
			<button class="button-default-white">
				<i class="icon-quit"></i>
				<span>退出</span>
			</button>
		</div>
	</header>
</template>

<script>
	export default {
		name: "Header",
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	header,.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 70px;
		padding: 0 40px;
		background: @white;
		.logo {
			width: 146px;
			height: 46px;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.buttons {
			button {
				font-size: 16px;
				padding: 9px 21px;
				i {
					margin-right: 8px;
					font-size: 18px;
					vertical-align: text-bottom;
				}
			}
		}
	}
</style>

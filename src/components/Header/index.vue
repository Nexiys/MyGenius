<template>
	<header class="header">
		<!-- 公司 logo -->
		<div class="logo">
			<img src="../../assets/img/LOGO-1.png" alt="天生我才测评系统">
		</div>
		<!-- 右侧暂停、退出控制按钮 -->
		<div class="buttons">
			<button class="button-default-white" @click="pauseClickHandle">
				<i class="icon-pause"></i>
				<span>暂停</span>
			</button>
			<button class="button-default-white" @click="quitClickHandle">
				<i class="icon-quit"></i>
				<span>退出</span>
			</button>
		</div>
	</header> 
</template>

<script>
	export default {
		name: "Header",
		methods: {
			// 暂停处理
			pauseClickHandle () {
	
			  this.$emit('question-paused')
			},
			// 退出处理
			quitClickHandle () {
		
			  this.$emit('question-quit')
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	header,.header,#header {
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

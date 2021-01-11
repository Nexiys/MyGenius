<template>
	<section class="exit-dialog-wrap">
		<div class="dialog-bg"></div>
		<div class="dialog-content">
		  <header class="dialog-header">
		    <i class="icon icon-popup-close" @click="exitClickHandle"></i>
		  </header>
		  <div class="dialog-exit-middle">
		    <h3 class="dialog-title">退出测评</h3>
		    <p>已为您保存测评进度～</p>
		    <p>请在72小时内继续测评，超时将需要重新测评！</p>
		  </div>
		  <div class="buttons">
		    <button
		      class="button-exit"
		      @click="exitClickHandle">
		      退出测评
		    </button>
		    <button
		      class="button-continue"
		      @click="continueClickHandle">
		      继续测评
		    </button>
		  </div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'ExitDialog',
		methods: {
			// 退出
			exitClickHandle () {
				this.$emit('comfirm-exit')
			},
			// 继续
			continueClickHandle () {
				this.$emit('abandon-exit')
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.exit-dialog-wrap {
		.dialog-bg {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 999;
			background: rgba(0, 0, 0, .4);
		}
		.dialog-content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 450px;
			padding: 18px 18px 40px;
			border-radius: 4px;
			background: @white;
			z-index: 1000;
			.dialog-header {
				font-size: 0;
				color: @text-minor;
				text-align: right;
				.icon {
					line-height: 16px;
					font-size: 16px;
					color: @text-secondary;
					cursor: pointer;
					&:hover {
						color: @text-minor;
					}
				}
			}
			.dialog-exit-middle {
				margin-top: 6px;
				margin-bottom: 48px;
				color: @text-minor;
				text-align: center;
				.dialog-title {
					margin-bottom: 48px;
					line-height: 18px;
					font-size: 18px;
					font-weight: 400;
				}
				p {
				  font-size: 14px;
				}
			}
			.buttons {
				text-align: center;
				button {
					display: inline-block;
					line-height: 1;
					padding: 14px 47px;
					font-size: 14px;
					border-radius: 4px;
					box-sizing: border-box;
					background: @white;
					& + button {
						margin-left: 30px;
					}
				}
				.button-exit {
					border: 1px solid @border-color;
					color: @text-color;
					&:hover,.hover {
						background: @hover-blue;
						color: @white;
						border: 1px solid @hover-blue;
					}
					&:active,.active {
						background: @active-blue;
						color: @white;
						border: 1px solid @active-blue;
					}
				}
				.button-continue {
					background:@normal-blue;
					border: 1px solid @normal-blue;
					color: @white;
					&:hover,.hover {
						background: @hover-blue;
						border: 1px solid @hover-blue;
						color: @white;
					}
					&:active,.active {
						background: @active-blue;
						border: 1px solid @active-blue;
						color: @white;
					}
				}
			}
		}
	}
</style>

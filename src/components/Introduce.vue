<template>
	<section class="introduce">
		<div class="i-box">
			<div class="i-con">
				<h2>工作记忆-抑制</h2>
				<p>接下来你将看到一些图片及图片名称、类别。请准确记住它们。然后按照题目要求又快又准确的对图片名称或类别进行回忆。</p>
				<a href="induce-type-1.html">开始答题</a>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'Introduce',
	}
</script>

<style lang="less" scoped>
	
	@import '../styles/base.less';
	@import '../styles/common.less';
	
	.introduce {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: 35px;
		width: 1060px;
		height: 380px;
	
		background: url(../assets/img/matters-needing-attention.png) no-repeat;
		background-position: 0 50%;
		background-size: 370px 380px;
	
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	
		.i-box {
			position: relative;
	
			float: right;
	
			width: 610px;
			height: 380px;
			padding: 40px 46px;
	
			font-family: 'MicrosoftYaHei';
	
			-webkit-border-radius: 8px;
				-moz-border-radius: 8px;
					border-radius: 8px;
			background: #ebf3ff;
	
			text-align: center;
	
				-ms-border-radius: 8px;
				-o-border-radius: 8px;
	
			.i-con {
				width: 100%;
				height: 100%;
				
				display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
				display: -moz-box; /* 老版本语法: Firefox (buggy) */
				display: -ms-flexbox; /* 混合版本语法: IE 10 */
				display: -webkit-flex; /* 新版本语法: Chrome 21+ */
				display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
				flex-direction: column;
				-webkit-justify-content: space-between;
				justify-content: space-between;
				flex: 1;
				h2 {
					font-size: 32px;
					font-weight: 600;
					line-height: 32px;
					
					color: #006ad7;
					
					letter-spacing: 0;
				}
					
				p {
					// margin-top: 12px;
					
					font-size: 22px;
					line-height: 34px;
					
					color: #007af8;
					
					text-align: left;
					letter-spacing: 0;
					
					&:nth-child(2) {
						// .mt-36;
					}
					
					&:nth-child(3) {
						// .mt-12;
					}
				}
					
				a {
					display: inline-block;
					
					width: 280px;
					height: 60px;
					margin: 0 auto;
					
					font-size: 24px;
					line-height: 60px;
					
					color: @white;
					border-radius: @border-radius;
					background: @normal-blue;
					
					cursor: pointer;
					letter-spacing: 0;
					
					&:hover {
						background: @hover-blue;
					}
					
					&:active {
						background: @active-blue;
					}
				}
					
				&::after {
					position: absolute;
					top: 60px;
					left: -15px;
					
					width: 30px;
					height: 30px;
					
					background: #ebf3ff;
					
					content: '';
					-webkit-transform: rotate(45deg);
					-moz-transform: rotate(45deg);
					-ms-transform: rotate(45deg);
					-o-transform: rotate(45deg);
					transform: rotate(45deg);
				}
			}
		}
	}
</style>

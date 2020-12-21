<template>
	<!-- Input框 组件结构 -->
	<div class="content">
		<!-- 账号登录 -->
		<!-- <section class="account-box">
			<div class="account">
				<i class="icon-account"></i>
				<input type="text" placeholder="账号">
			</div>
			<div class="password">
				<i class="icon-password"></i>
				<input type="password" placeholder="密码">
				<i class="icon-visible"></i>
			</div>
		</section> -->
		<!-- 手机号登录 -->
		<section class="phone-box">
			<!-- 手机号输入框组 -->
			<div class="iphone">
				<i class="icon-mobile_phone"></i>
				<input :type="type" :value="value" placeholder="placeholder" :name="name" @input="$emit('input',$event.target.value)">
				<!-- 获取验证码按钮 -->
				<a v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')" class="get-code">{{ btnTitle }}</a>
			</div>
			<!-- 输入验证码框组 -->
			<div class="v-code">
				<i class="icon-verification_code"></i>
				<input type="text" placeholder="验证码">
			</div>
			
			<!-- 错误提示信息和忘记密码 -->
			<div class="msg-forget">
				<div class="msg" v-if="error">
					<i class="icon-test_fail"></i>
					<em>{{ error }}</em>
				</div>
				<!-- <div class="forget">忘记密码</div> -->
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name:'inputGroup',
		props: {
			type : {
				type: String,
				default: "text"
			},
			value: String,
			placeholder: String,
			name: String,
			btnTitle: String,
			disabled: Boolean,
			error: String
		}
	}
</script>

<style lang="less">
  @import '~@/styles/login.less';
</style>

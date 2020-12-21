<template>
	<section class="container">
		<div class="wrap">
			<div class="title">欢迎加入天生我才</div>
			<div class="main">
				<ul>
					<li>
						<span><em>*</em>身份选择：</span>
						<div><input type="radio"><label for="">学生</label></div>
						<div><input type="radio"><label for="">家长</label></div>
						<div><input type="radio"><label for="">老师</label></div>
						<div><input type="radio"><label for="">培训机构</label></div>
					</li>
					<li>
						<span><em>*</em>手机号码：</span>
						<input type="text">
						<a>获取验证码</a>
					</li>
					<li>
						<span><em>*</em>验证码：</span>
						<input type="text">
					</li>
					<li>
						<span><em>*</em>登录密码：</span>
						<input type="text">
					</li>
					<li>
						<span><em></em>学校识别码</span>
						<input type="text">
					</li>
				</ul>
				<div class="agree">
					<input type="radio">
					<label for=""></label>
					<a>注册协议</a>
				</div>
				<a>注册并登录</a>
				<a>已有账号，去登录</a>
			</div>
		</div>
	</section>
</template>

<script>
export default {
  name: 'Register',
}
</script>

<style lang="less">
  @import '~@/styles/register.less';
</style>
